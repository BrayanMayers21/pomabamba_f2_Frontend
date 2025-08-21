import { Edit, Trash2, Eye } from "lucide-react";
import type { TableAction } from "./ActionCell";

// Acción: Ver detalles
export const viewAction = (onView: (item: any) => void): TableAction => ({
  id: "view",
  label: "Ver detalles",
  icon: <Eye className="h-4 w-4" />,
  onClick: onView,
  variant: "default",
});

// Acción: Editar
export const editAction = (onEdit: (item: any) => void): TableAction => ({
  id: "edit",
  label: "Editar",
  icon: <Edit className="h-4 w-4" />,
  onClick: onEdit,
  variant: "default",
});

// Acción: Eliminar
export const deleteAction = (onDelete: (item: any) => void): TableAction => ({
  id: "delete",
  label: "Eliminar",
  icon: <Trash2 className="h-4 w-4" />,
  onClick: onDelete,
  variant: "destructive",
});

// Exportar todas las acciones por defecto
export const defaultActions = {
  view: viewAction,
  edit: editAction,
  delete: deleteAction,
};

// Interfaz para los callbacks de acciones
interface ActionCallbacks {
  onView?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  // Aquí se pueden agregar más callbacks para futuras acciones
}

// Función helper para generar automáticamente las acciones disponibles
export const generateNoticeActions = (
  callbacks: ActionCallbacks
): TableAction[] => {
  const actions: TableAction[] = [];

  // Agregar acción de ver si el callback está disponible
  if (callbacks.onView) {
    actions.push(defaultActions.view(callbacks.onView));
  }

  // Agregar acción de editar si el callback está disponible
  if (callbacks.onEdit) {
    actions.push(defaultActions.edit(callbacks.onEdit));
  }

  // Agregar acción de eliminar si el callback está disponible
  if (callbacks.onDelete) {
    actions.push(defaultActions.delete(callbacks.onDelete));
  }

  // Aquí se pueden agregar más acciones automáticamente cuando se necesiten
  // if (callbacks.onDuplicate) {
  //   actions.push(defaultActions.duplicate(callbacks.onDuplicate));
  // }

  return actions;
};
