export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-4">Admin</h2>
      <ul className="space-y-2">
        <li>Panel</li>
        <li>Usuarios</li>
        <li>Configuración</li>
      </ul>
    </aside>
  );
}
