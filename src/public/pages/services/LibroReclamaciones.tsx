import React, { useState, useRef } from 'react';
import { Mail, User, Building2, FileText, Calendar, Clock, MapPin, Phone, Send, AlertCircle, CheckCircle } from "lucide-react";

const ReclamationsPage = () => {
  // Estado del formulario - Datos que serán enviados al backend Django REST Framework
  const [formData, setFormData] = useState({
    // Datos personales - Models: name, last_name, identity_type, identity_number
    name: '',                    // CharField(max_length=45) - Nombre del reclamante
    last_name: '',              // CharField(max_length=45) - Apellidos del reclamante
    identity_type: 'DNI',       // CharField(max_length=30, choices=IdentityTypeEnum.choices) - Tipo de documento
    identity_number: '',        // CharField(max_length=45) - Número de documento de identidad
    
    // Datos de contacto - Models: email, phone, celphone, direction
    email: '',                  // EmailField(max_length=100) - Correo electrónico
    phone: '',                  // CharField(max_length=45, blank=True, null=True) - Teléfono fijo (opcional)
    celphone: '',              // CharField(max_length=45) - Número de celular
    direction: '',             // CharField(max_length=100) - Dirección del reclamante
    
    // Datos de la reclamación - Models: type, date, time, area, office, description
    type: 'Queja',             // CharField(max_length=30, choices=ReclamationTypeEnum.choices) - Tipo de reclamación
    date: '',                  // DateField() - Fecha del incidente
    time: '',                  // TimeField() - Hora del incidente
    area: '',                  // CharField(max_length=45) - Área donde ocurrió el problema
    office: '',                // CharField(max_length=45) - Oficina específica
    description: '',           // TextField(max_length=500) - Descripción detallada del problema
    
    // Archivo adjunto - Models: path, file_name
    file: null                 // FileField(upload_to='uploads/reclamations/') - Archivo de evidencia
  });

  // Estados de validación y UI
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const fileInputRef = useRef(null);

  // Configuraciones de validación
  const identityTypes = [
    { value: 'DNI', label: 'DNI' },
    { value: 'Carnet de Extranjería', label: 'Carnet de Extranjería' },
    { value: 'Pasaporte', label: 'Pasaporte' },
    { value: 'RUC', label: 'RUC' }
  ];

  const reclamationTypes = [
    { value: 'Queja', label: 'Queja' },
    { value: 'Reclamo', label: 'Reclamo' }
  ];

  const areas = [
    'Dirección',
    'Administración', 
    'Gestión Pedagógica',
    'Gestión Institucional',
    'Almacén',
    'Recursos Humanos',
    'Planificación',
    'Racionalización'
  ];

  // Configuración de archivos permitidos
  const allowedFileTypes = {
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png'
  };

  const maxFileSize = 5 * 1024 * 1024; // 5MB en bytes

  // Funciones de validación específicas
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateDNI = (dni) => {
    return /^\d{8}$/.test(dni);
  };

  const validateRUC = (ruc) => {
    return /^\d{11}$/.test(ruc);
  };

  const validatePhone = (phone) => {
    return /^\d{6,15}$/.test(phone.replace(/\s/g, ''));
  };

  const validateIdentityNumber = (number, type) => {
    if (!number.trim()) return false;
    
    switch (type) {
      case 'DNI':
        return validateDNI(number);
      case 'RUC':
        return validateRUC(number);
      case 'Carnet de Extranjería':
        return number.length >= 6 && number.length <= 15;
      case 'Pasaporte':
        return number.length >= 6 && number.length <= 15;
      default:
        return true;
    }
  };

  const validateFile = (file) => {
    if (!file) return { isValid: true, error: null };

    const errors = [];

    // Validar tipo de archivo
    if (!allowedFileTypes[file.type]) {
      errors.push('Tipo de archivo no permitido. Solo se aceptan: PDF, DOC, DOCX, JPG, PNG');
    }

    // Validar tamaño de archivo
    if (file.size > maxFileSize) {
      errors.push(`El archivo es demasiado grande. Tamaño máximo: ${maxFileSize / (1024 * 1024)}MB`);
    }

    // Validar extensión (seguridad adicional)
    const fileName = file.name.toLowerCase();
    const allowedExtensions = Object.values(allowedFileTypes);
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
      errors.push('Extensión de archivo no válida');
    }

    // Validar nombre de archivo (prevenir archivos ejecutables disfrazados)
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar', '.app', '.deb', '.rpm'];
    const isDangerous = dangerousExtensions.some(ext => fileName.includes(ext));
    
    if (isDangerous) {
      errors.push('Archivo potencialmente peligroso detectado');
    }

    return {
      isValid: errors.length === 0,
      error: errors.length > 0 ? errors.join('. ') : null
    };
  };

  // Manejador de cambios en inputs
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const validation = validateFile(file);
        if (validation.isValid) {
          setFormData(prev => ({
            ...prev,
            [name]: file
          }));
          // Limpiar error del archivo si existía
          if (errors[name]) {
            setErrors(prev => ({
              ...prev,
              [name]: ''
            }));
          }
        } else {
          // Mostrar error de archivo
          setErrors(prev => ({
            ...prev,
            [name]: validation.error
          }));
          // Limpiar el input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Validación en tiempo real para algunos campos
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }

      // Validaciones específicas en tiempo real
      if (name === 'email' && value && !validateEmail(value)) {
        setErrors(prev => ({
          ...prev,
          email: 'Formato de email inválido'
        }));
      }

      if (name === 'identity_number' && value && !validateIdentityNumber(value, formData.identity_type)) {
        let errorMsg = 'Número de documento inválido';
        if (formData.identity_type === 'DNI') {
          errorMsg = 'DNI debe tener 8 dígitos';
        } else if (formData.identity_type === 'RUC') {
          errorMsg = 'RUC debe tener 11 dígitos';
        }
        setErrors(prev => ({
          ...prev,
          identity_number: errorMsg
        }));
      }

      if ((name === 'phone' || name === 'celphone') && value && !validatePhone(value)) {
        setErrors(prev => ({
          ...prev,
          [name]: 'Número de teléfono inválido (solo dígitos, 6-15 caracteres)'
        }));
      }
    }
  };

  // Validación completa del formulario
  const validateForm = () => {
    const newErrors = {};
    
    // Validaciones de campos requeridos
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.last_name.trim()) newErrors.last_name = 'Los apellidos son requeridos';
    if (!formData.identity_number.trim()) newErrors.identity_number = 'El número de documento es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.celphone.trim()) newErrors.celphone = 'El celular es requerido';
    if (!formData.direction.trim()) newErrors.direction = 'La dirección es requerida';
    if (!formData.date) newErrors.date = 'La fecha es requerida';
    if (!formData.time) newErrors.time = 'La hora es requerida';
    if (!formData.area.trim()) newErrors.area = 'El área es requerida';
    if (!formData.office.trim()) newErrors.office = 'La oficina es requerida';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
    
    // Validaciones de formato
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (formData.identity_number && !validateIdentityNumber(formData.identity_number, formData.identity_type)) {
      let errorMsg = 'Número de documento inválido';
      if (formData.identity_type === 'DNI') {
        errorMsg = 'DNI debe tener exactamente 8 dígitos';
      } else if (formData.identity_type === 'RUC') {
        errorMsg = 'RUC debe tener exactamente 11 dígitos';
      }
      newErrors.identity_number = errorMsg;
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Número de teléfono inválido';
    }

    if (formData.celphone && !validatePhone(formData.celphone)) {
      newErrors.celphone = 'Número de celular inválido';
    }

    // Validación de longitud de campos
    if (formData.name.length > 45) newErrors.name = 'El nombre no puede exceder 45 caracteres';
    if (formData.last_name.length > 45) newErrors.last_name = 'Los apellidos no pueden exceder 45 caracteres';
    if (formData.identity_number.length > 45) newErrors.identity_number = 'El número de documento no puede exceder 45 caracteres';
    if (formData.email.length > 100) newErrors.email = 'El email no puede exceder 100 caracteres';
    if (formData.phone.length > 45) newErrors.phone = 'El teléfono no puede exceder 45 caracteres';
    if (formData.celphone.length > 45) newErrors.celphone = 'El celular no puede exceder 45 caracteres';
    if (formData.direction.length > 100) newErrors.direction = 'La dirección no puede exceder 100 caracteres';
    if (formData.area.length > 45) newErrors.area = 'El área no puede exceder 45 caracteres';
    if (formData.office.length > 45) newErrors.office = 'La oficina no puede exceder 45 caracteres';
    if (formData.description.length > 500) newErrors.description = 'La descripción no puede exceder 500 caracteres';

    // Validación de fecha (no puede ser futura)
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate > today) {
        newErrors.date = 'La fecha no puede ser futura';
      }
    }

    // Validación de archivo si existe
    if (formData.file) {
      const validation = validateFile(formData.file);
      if (!validation.isValid) {
        newErrors.file = validation.error;
      }
    }

    return newErrors;
  };

  // Función para enviar datos al backend Django REST Framework
  const submitToBackend = async (formDataToSend) => {
    try {
      // Simulación para el ejemplo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, id: Math.random().toString(36).substr(2, 9) });
        }, 2000);
      });
    } catch (error) {
      throw new Error(`Error al enviar la reclamación: ${error.message}`);
    }
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Preparar FormData para enviar al backend Django REST Framework
      const formDataToSend = new FormData();
      
      // Campos del modelo Django que serán enviados:
      formDataToSend.append('name', formData.name);
      formDataToSend.append('last_name', formData.last_name);
      formDataToSend.append('identity_type', formData.identity_type);
      formDataToSend.append('identity_number', formData.identity_number);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone || '');
      formDataToSend.append('celphone', formData.celphone);
      formDataToSend.append('direction', formData.direction);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('time', formData.time);
      formDataToSend.append('area', formData.area);
      formDataToSend.append('office', formData.office);
      formDataToSend.append('description', formData.description);
      
      if (formData.file) {
        formDataToSend.append('path', formData.file);
        formDataToSend.append('file_name', formData.file.name);
      }

      await submitToBackend(formDataToSend);
      
      setSubmitStatus('success');
      
      // Reset form después del éxito
      setFormData({
        name: '',
        last_name: '',
        identity_type: 'DNI',
        identity_number: '',
        email: '',
        phone: '',
        celphone: '',
        direction: '',
        type: 'Queja',
        date: '',
        time: '',
        area: '',
        office: '',
        description: '',
        file: null
      });
      setErrors({});
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error('Error al enviar reclamación:', error);
      setSubmitStatus('error');
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Componente de mensaje de estado
  const StatusMessage = () => {
    if (submitStatus === 'success') {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <h4 className="text-green-800 font-semibold">¡Reclamación enviada exitosamente!</h4>
              <p className="text-green-600 text-sm">Su reclamación ha sido registrada y será procesada en breve.</p>
            </div>
          </div>
        </div>
      );
    }
    
    if (submitStatus === 'error') {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <h4 className="text-red-800 font-semibold">Error al enviar la reclamación</h4>
              <p className="text-red-600 text-sm">
                {errors.submit || 'Por favor verifique los datos e intente nuevamente.'}
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen mt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <FileText className="w-12 h-12 text-white/90" />
            <h1 className="text-4xl font-bold tracking-tight">Libro de Reclamaciones</h1>
          </div>
          <p className="text-xl text-white/90 mb-4">
            Registro de Quejas y Reclamos - UGEL Pomabamba
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Formulario Principal */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-8 border border-blue-100/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                  Formulario de Reclamación
                </h3>
              </div>

              <StatusMessage />

              <div className="space-y-6">
                {/* Datos Personales */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Datos Personales
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombres * <span className="text-gray-500 text-xs">(máx. 45 caracteres)</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        maxLength={45}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Ingrese sus nombres"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apellidos * <span className="text-gray-500 text-xs">(máx. 45 caracteres)</span>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        maxLength={45}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.last_name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Ingrese sus apellidos"
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.last_name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Documento
                      </label>
                      <select
                        name="identity_type"
                        value={formData.identity_type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        {identityTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Documento * 
                        <span className="text-gray-500 text-xs">
                          ({formData.identity_type === 'DNI' ? '8 dígitos' : 
                            formData.identity_type === 'RUC' ? '11 dígitos' : '6-15 caracteres'})
                        </span>
                      </label>
                      <input
                        type="text"
                        name="identity_number"
                        value={formData.identity_number}
                        onChange={handleInputChange}
                        maxLength={45}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.identity_number ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder={
                          formData.identity_type === 'DNI' ? '12345678' :
                          formData.identity_type === 'RUC' ? '12345678901' :
                          'Número de documento'
                        }
                      />
                      {errors.identity_number && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.identity_number}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Datos de Contacto */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-emerald-600" />
                    Datos de Contacto
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email * <span className="text-gray-500 text-xs">(máx. 100 caracteres)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        maxLength={100}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors ${
                          errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="correo@ejemplo.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono Fijo <span className="text-gray-500 text-xs">(opcional, 6-15 dígitos)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        maxLength={45}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors ${
                          errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="043123456"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Celular * <span className="text-gray-500 text-xs">(6-15 dígitos)</span>
                      </label>
                      <input
                        type="tel"
                        name="celphone"
                        value={formData.celphone}
                        onChange={handleInputChange}
                        maxLength={45}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors ${
                          errors.celphone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="987654321"
                      />
                      {errors.celphone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.celphone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección * <span className="text-gray-500 text-xs">(máx. 100 caracteres)</span>
                      </label>
                      <input
                        type="text"
                        name="direction"
                        value={formData.direction}
                        onChange={handleInputChange}
                        maxLength={100}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors ${
                          errors.direction ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Jr. Los Andes 123, Pomabamba"
                      />
                      {errors.direction && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.direction}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Datos de la Reclamación */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-orange-600" />
                    Datos de la Reclamación
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo *
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          {reclamationTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha del Incidente *
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          max={new Date().toISOString().split('T')[0]}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                            errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {errors.date && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.date}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hora del Incidente *
                        </label>
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                            errors.time ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {errors.time && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.time}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Área * <span className="text-gray-500 text-xs">(máx. 45 caracteres)</span>
                        </label>
                        <select
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                            errors.area ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Seleccione un área</option>
                          {areas.map(area => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                        {errors.area && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.area}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Oficina Específica * <span className="text-gray-500 text-xs">(máx. 45 caracteres)</span>
                        </label>
                        <input
                          type="text"
                          name="office"
                          value={formData.office}
                          onChange={handleInputChange}
                          maxLength={45}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                            errors.office ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Mesa de partes, Secretaría, etc."
                        />
                        {errors.office && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.office}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción Detallada de la Reclamación *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={5}
                        maxLength={500}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none ${
                          errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Describa detalladamente su queja o reclamo, incluyendo fechas, nombres del personal involucrado, y cualquier detalle relevante..."
                      />
                      <div className="flex justify-between items-center mt-2">
                        {errors.description && (
                          <p className="text-red-500 text-sm flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.description}
                          </p>
                        )}
                        <p className={`text-sm ml-auto ${formData.description.length > 450 ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
                          {formData.description.length}/500 caracteres
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Archivo de Evidencia <span className="text-gray-500 text-xs">(opcional)</span>
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="file"
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 ${
                          errors.file ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <div className="mt-2 space-y-1">
                        {errors.file && (
                          <p className="text-red-500 text-sm flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.file}
                          </p>
                        )}
                        <div className="text-gray-500 text-xs space-y-1">
                          <p>• Formatos permitidos: PDF, DOC, DOCX, JPG, PNG</p>
                          <p>• Tamaño máximo: 5MB</p>
                          <p>• Archivos ejecutables están prohibidos por seguridad</p>
                        </div>
                        {formData.file && (
                          <div className="bg-green-50 border border-green-200 rounded p-2 text-sm">
                            <p className="text-green-800 flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Archivo seleccionado: <span className="font-semibold ml-1">{formData.file.name}</span>
                            </p>
                            <p className="text-green-600 text-xs">
                              Tamaño: {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-8 py-4 rounded-full font-semibold text-lg shadow-lg transform transition-all duration-200 flex items-center space-x-2 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Enviar Reclamación</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de Información */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-2xl shadow-emerald-200/30 overflow-hidden border border-emerald-100/20 backdrop-blur-sm">
                {/* Header de la tarjeta */}
                <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h6 className="text-2xl font-bold text-center tracking-wide">
                      INFORMACIÓN
                    </h6>
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6 space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-blue-600" />
                      ¿Qué es una Queja?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Insatisfacción sobre la atención o el procedimiento empleado durante el desarrollo de servicios en la institución.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-orange-600" />
                      ¿Qué es un Reclamo?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Insatisfacción sobre la calidad de un bien o servicio prestado por la institución educativa.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Mail className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-gray-800">Contacto</span>
                    </div>
                    <a
                      href="mailto:ugelpomabamba@ugelpomabamba.gob.pe"
                      className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors duration-200 hover:underline block text-center text-sm"
                    >
                      informes@ugelpomabamba.gob.pe
                    </a>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-gray-800">Horario de Atención</span>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Lunes a Viernes<br />
                      8:00 AM - 5:30 PM
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <MapPin className="w-5 h-5 text-yellow-600" />
                      <span className="font-semibold text-gray-800">Tiempo de Respuesta</span>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      • Quejas: 15 días hábiles<br />
                      • Reclamos: 30 días hábiles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Espaciado inferior */}
        <div className="py-12"></div>
      </div>
    </div>
  );
};

export default ReclamationsPage;