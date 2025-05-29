"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  FilterIcon,
  MoreVerticalIcon,
  SendIcon,
  SearchIcon,
} from "lucide-react"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const transactionSchema = z.object({
  id: z.number(),
  type: z.string(),
  description: z.string(),
  recipient: z.string(),
  amount: z.number(),
  date: z.string(),
  status: z.string(),
  category: z.string(),
})

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    transfer: "🔄",
    income: "💰",
    food: "🍽️",
    entertainment: "🎬",
    transport: "🚗",
    health: "🏥",
    utilities: "💡",
    cashback: "💎",
  }
  return icons[category] || "💳"
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    transfer: "bg-blue-50 text-blue-700 border-blue-200",
    income: "bg-green-50 text-green-700 border-green-200",
    food: "bg-orange-50 text-orange-700 border-orange-200",
    entertainment: "bg-purple-50 text-purple-700 border-purple-200",
    transport: "bg-cyan-50 text-cyan-700 border-cyan-200",
    health: "bg-red-50 text-red-700 border-red-200",
    utilities: "bg-yellow-50 text-yellow-700 border-yellow-200",
    cashback: "bg-emerald-50 text-emerald-700 border-emerald-200",
  }
  return colors[category] || "bg-gray-50 text-gray-700 border-gray-200"
}

const columns: ColumnDef<z.infer<typeof transactionSchema>>[] = [
  {
    accessorKey: "description",
    header: "Transação",
    cell: ({ row }) => {
      const transaction = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <span className="text-lg">{getCategoryIcon(transaction.category)}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{transaction.description}</span>
            <span className="text-sm text-muted-foreground">{transaction.recipient}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => (
      <Badge variant="outline" className={`${getCategoryColor(row.original.category)} px-2 py-1`}>
        {row.original.category === "transfer" && "Transferência"}
        {row.original.category === "income" && "Receita"}
        {row.original.category === "food" && "Alimentação"}
        {row.original.category === "entertainment" && "Entretenimento"}
        {row.original.category === "transport" && "Transporte"}
        {row.original.category === "health" && "Saúde"}
        {row.original.category === "utilities" && "Contas"}
        {row.original.category === "cashback" && "Cashback"}
      </Badge>
    ),
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const date = new Date(row.original.date)
      return (
        <div className="text-sm">
          {date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
          <div className="text-xs text-muted-foreground">
            {date.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const amount = row.original.amount
      const isPositive = amount > 0
      return (
        <div className={`text-right font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
          <div className="flex items-center justify-end gap-1">
            {isPositive ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
            R${" "}
            {Math.abs(amount).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
            <MoreVerticalIcon />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
          <DropdownMenuItem>Compartilhar</DropdownMenuItem>
          <DropdownMenuItem>Categorizar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">Contestar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function TransferDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <SendIcon className="mr-2 h-4 w-4" />
          Nova Transferência
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Transferência</DialogTitle>
          <DialogDescription>Envie dinheiro para qualquer pessoa via PIX ou TED.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Para quem?</Label>
            <Input id="recipient" placeholder="Nome, CPF, telefone ou chave PIX" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <Input id="amount" placeholder="R$ 0,00" type="number" step="0.01" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Input id="description" placeholder="Para que é essa transferência?" />
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Cancelar
          </Button>
          <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Transferir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof transactionSchema>[]
}) {
  const [data] = React.useState(() => initialData)
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    enableRowSelection: false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <Tabs defaultValue="all" className="flex w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="income">Receitas</TabsTrigger>
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
          <TabsTrigger value="transfers">Transferências</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar transações..."
              value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("description")?.setFilterValue(event.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filtros
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <TransferDialog />
        </div>
      </div>

      <TabsContent value="all" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-muted/50">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Nenhuma transação encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredRowModel().rows.length} transação(ões) encontrada(s).
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Linhas por página
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Ir para primeira página</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Página anterior</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Próxima página</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Ir para última página</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="income" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
          Filtro de receitas será implementado aqui
        </div>
      </TabsContent>

      <TabsContent value="expenses" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
          Filtro de gastos será implementado aqui
        </div>
      </TabsContent>

      <TabsContent value="transfers" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
          Filtro de transferências será implementado aqui
        </div>
      </TabsContent>
    </Tabs>
  )
}
