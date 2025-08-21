import axios from "axios";

// Obtener categorías de noticias
export const getNoticeCategories = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers: any = {};

    // Solo agregar Authorization si hay token disponible
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return axios.get("http://localhost:8000/api/v1/core/notices_category/", {
      headers,
    });
  } catch (error) {
    console.error("Error en getNoticeCategories:", error);
    throw error;
  }
};

// Obtener una categoría específica por ID
export const getNoticeCategory = async (id: number | string) => {
  try {
    const token = localStorage.getItem("token");
    const headers: any = {};

    // Solo agregar Authorization si hay token disponible
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return axios.get(
      `http://localhost:8000/api/v1/core/notices_category/${id}/`,
      {
        headers,
      }
    );
  } catch (error) {
    console.error("Error en getNoticeCategory:", error);
    throw error;
  }
};

// Obtener tags/etiquetas
export const getTags = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers: any = {};

    // Solo agregar Authorization si hay token disponible
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return axios.get("http://localhost:8000/api/v1/core/notices_label/", {
      headers,
    });
  } catch (error) {
    console.error("Error en getTags:", error);
    throw error;
  }
};

// Obtener noticias con paginación y búsqueda del backend
export const getNotices = async (
  page: number = 1,
  pageSize: number = 5,
  search?: string
) => {
  try {
    const token = localStorage.getItem("token");
    const headers: any = {};

    // Solo agregar Authorization si hay token disponible
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Construir la URL con parámetros de búsqueda
    let url = `http://localhost:8000/api/v1/core/notices/?page=${page}&page_size=${pageSize}`;

    // Agregar parámetro de búsqueda si se proporciona
    if (search && search.trim()) {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }

    return axios.get(url, {
      headers,
    });
  } catch (error) {
    console.error("Error en getNotices:", error);
    throw error;
  }
};

// Crear una noticia
export const createNotice = async (data: FormData): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    const headers: any = {};

    // Solo agregar Authorization si hay token disponible
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // No agregamos Content-Type para FormData, axios lo maneja automáticamente
    return axios.post("http://localhost:8000/api/v1/core/notices/", data, {
      headers,
    });
  } catch (error) {
    console.error("Error en createNotice:", error);
    throw error;
  }
};

// Actualizar una noticia
export const updateNotice = async (
  id: number | string,
  data: any
): Promise<any> => {
  return axios.put(`http://localhost:8000/api/v1/core/notices/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
};

// Eliminar una noticia

export const deleteNotice = async (id: number | string): Promise<any> => {
  return axios.delete(`http://localhost:8000/api/v1/core/notices/${id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
