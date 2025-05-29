"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const spendingData = [
  { date: "2024-01-01", food: 450, transport: 120, entertainment: 80, utilities: 200, shopping: 300 },
  { date: "2024-01-02", food: 380, transport: 95, entertainment: 120, utilities: 180, shopping: 250 },
  { date: "2024-01-03", food: 420, transport: 110, entertainment: 90, utilities: 220, shopping: 280 },
  { date: "2024-01-04", food: 390, transport: 130, entertainment: 150, utilities: 190, shopping: 320 },
  { date: "2024-01-05", food: 460, transport: 105, entertainment: 70, utilities: 210, shopping: 290 },
  { date: "2024-01-06", food: 410, transport: 140, entertainment: 110, utilities: 200, shopping: 260 },
  { date: "2024-01-07", food: 440, transport: 115, entertainment: 95, utilities: 230, shopping: 310 },
]

const categoryData = [
  { name: "Alimentação", value: 2950, color: "#8b5cf6" },
  { name: "Transporte", value: 815, color: "#06b6d4" },
  { name: "Entretenimento", value: 715, color: "#10b981" },
  { name: "Contas", value: 1430, color: "#f59e0b" },
  { name: "Compras", value: 2010, color: "#ef4444" },
]

const chartConfig = {
  food: {
    label: "Alimentação",
    color: "hsl(var(--chart-1))",
  },
  transport: {
    label: "Transporte",
    color: "hsl(var(--chart-2))",
  },
  entertainment: {
    label: "Entretenimento",
    color: "hsl(var(--chart-3))",
  },
  utilities: {
    label: "Contas",
    color: "hsl(var(--chart-4))",
  },
  shopping: {
    label: "Compras",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange] = React.useState("7d")
  const [chartType, setChartType] = React.useState("area")

  const filteredData = spendingData.filter((item, index) => {
    if (timeRange === "7d") return index < 7
    if (timeRange === "30d") return index < 30
    return true
  })

  return (
    <div className="grid gap-4 @4xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardTitle>Gastos por Categoria</CardTitle>
          <CardDescription>Últimos 7 dias</CardDescription>
          <div className="absolute right-4 top-4">
            <ToggleGroup
              type="single"
              value={chartType}
              onValueChange={setChartType}
              variant="outline"
              className="@[767px]/card:flex hidden"
            >
              <ToggleGroupItem value="area" className="h-8 px-2.5">
                Área
              </ToggleGroupItem>
              <ToggleGroupItem value="pie" className="h-8 px-2.5">
                Pizza
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          {chartType === "area" ? (
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
              <AreaChart data={filteredData}>
                <defs>
                  {Object.entries(chartConfig).map(([key, config]) => (
                    <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={config.color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={config.color} stopOpacity={0.1} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("pt-BR", {
                          month: "short",
                          day: "numeric",
                        })
                      }}
                      indicator="dot"
                      formatter={(value, name) => [
                        `R$ ${value}`,
                        chartConfig[name as keyof typeof chartConfig]?.label || name,
                      ]}
                    />
                  }
                />
                <Area dataKey="food" type="natural" fill="url(#fillfood)" stroke="var(--color-food)" stackId="a" />
                <Area
                  dataKey="transport"
                  type="natural"
                  fill="url(#filltransport)"
                  stroke="var(--color-transport)"
                  stackId="a"
                />
                <Area
                  dataKey="entertainment"
                  type="natural"
                  fill="url(#fillentertainment)"
                  stroke="var(--color-entertainment)"
                  stackId="a"
                />
                <Area
                  dataKey="utilities"
                  type="natural"
                  fill="url(#fillutilities)"
                  stroke="var(--color-utilities)"
                  stackId="a"
                />
                <Area
                  dataKey="shopping"
                  type="natural"
                  fill="url(#fillshopping)"
                  stroke="var(--color-shopping)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          ) : (
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => [`R$ ${value}`, name]} />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Resumo Mensal</CardTitle>
          <CardDescription>Janeiro 2024</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {categoryData.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <span className="text-sm font-semibold">R$ {category.value.toLocaleString("pt-BR")}</span>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total Gasto</span>
              <span className="text-lg">
                R$ {categoryData.reduce((sum, cat) => sum + cat.value, 0).toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
