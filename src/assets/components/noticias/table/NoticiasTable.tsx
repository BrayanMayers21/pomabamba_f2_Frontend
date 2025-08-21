"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { FolderOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { ActionCell, generateNoticeActions } from "./actions";
import { defaultColumns, type TableColumn } from "./columns";

interface Notice {
  id: number;
  title: string;
  slug: string;
  body: string;
  date: string;
  category: {
    id: number;
    name: string;
  };
  tags: Array<{
    id: number;
    name: string;
  }>;
  main_image: {
    url: string;
    file_name: string;
  };
}

interface NoticiasTableProps {
  noticias: Notice[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onEdit?: (notice: Notice) => void;
  onDelete?: (notice: Notice) => void;
  onView?: (notice: Notice) => void;
}

const NoticiasTable: React.FC<NoticiasTableProps> = ({
  noticias,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
  onView,
}) => {
  // Estado para detectar tema
  const [isDark, setIsDark] = useState(false);

  // Detectar tema
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode =
        (document.documentElement.hasAttribute("data-toolpad-color-scheme") &&
          document.documentElement.getAttribute("data-toolpad-color-scheme") ===
            "dark") ||
        document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Observar cambios en el tema
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-toolpad-color-scheme", "class"],
    });

    return () => observer.disconnect();
  }, []);

  const totalPages = Math.ceil(totalCount / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  // Configurar las columnas que vamos a mostrar
  const columnsToShow = [
    ...defaultColumns,
    // Agregar columna de acciones
    {
      key: "actions",
      header: "Acciones",
      width: "w-[70px]",
      render: (notice: Notice) => (
        <ActionCell
          item={notice}
          actions={generateNoticeActions({
            onView,
            onEdit,
            onDelete,
          })}
        />
      ),
    } as TableColumn,
  ];

  return (
    <div
      className={`w-full ${isDark ? " text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <Card
        className={`${isDark ? " border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle
              className={`flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-900"}`}
            >
              <FolderOpen
                className={`h-5 w-5 ${isDark ? "text-gray-300" : "text-gray-600"}`}
              />
              Lista de Noticias ({totalCount} total)
            </CardTitle>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Mostrar:
              </span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => onPageSizeChange(Number(value))}
              >
                <SelectTrigger
                  className={`w-20 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className={
                    isDark
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-200"
                  }
                >
                  {/* <SelectItem value="5">5</SelectItem> */}
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                por página
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`rounded-md border ${isDark ? "border-gray-600" : "border-gray-200"}`}
          >
            <Table>
              <TableHeader>
                <TableRow
                  className={isDark ? "border-gray-600" : "border-gray-200"}
                >
                  {columnsToShow.map((column) => (
                    <TableHead
                      key={column.key}
                      className={`${column.width} ${isDark ? "text-gray-300 bg-gray-700" : "text-gray-700 bg-gray-50"}`}
                    >
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {noticias.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columnsToShow.length}
                      className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      No hay noticias registradas
                    </TableCell>
                  </TableRow>
                ) : (
                  noticias.map((notice) => (
                    <TableRow
                      key={notice.id}
                      className={`${
                        isDark
                          ? "border-gray-600 hover:bg-gray-700/50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {columnsToShow.map((column) => (
                        <TableCell
                          key={column.key}
                          className={`${isDark ? "text-gray-200 border-gray-600" : "text-gray-900 border-gray-200"}`}
                        >
                          {column.render(notice)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Controles de paginación */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
            <div
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Mostrando {startItem} a {endItem} de {totalCount} resultados
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className={`${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => onPageChange(pageNum)}
                      className={`w-8 h-8 p-0 ${
                        currentPage === pageNum
                          ? isDark
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                          : isDark
                            ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                            : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                }`}
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoticiasTable;
