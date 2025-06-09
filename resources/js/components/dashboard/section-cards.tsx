"use client"

import { EyeIcon, EyeOffIcon, CreditCardIcon, TrendingUpIcon } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Account, User } from "@/types"

type Props = {
  account: Account;
  user: User;
};
export function SectionCards({ user, account }: Props) {

  const [showBalance, setShowBalance] = useState(true)

  return (
    <div className="
  *:data-[slot=card]:shadow-xs
  @xl/main:grid-cols-2
  @5xl/main:grid-cols-4
  grid grid-cols-1 gap-4 px-4
  *:data-[slot=card]:bg-gradient-to-t
  *:data-[slot=card]:from-purple-50
  *:data-[slot=card]:to-purple-200
  dark:*:data-[slot=card]:bg-gradient-to-t
  dark:*:data-[slot=card]:from-purple-900
  dark:*:data-[slot=card]:to-purple-800
  lg:px-6
">

      <Card className="@container/card col-span-full @xl/main:col-span-2">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2">
            Saldo em conta
            <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)} className="h-6 w-6 p-0">
              {showBalance ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </Button>
          </CardDescription>
          <CardTitle className="@[250px]/card:text-4xl text-3xl font-bold tabular-nums text-purple-600 dark:text-white">
            {showBalance ? "R$" + account.balance : "R$ ••••••"}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs bg-green-50 text-green-700 border-green-200"
            >
              <TrendingUpIcon className="size-3" />
              Conta Digital
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">Agência: 0001 • Conta: 12345678-9</div>
          <div className="text-muted-foreground">Última atualização: há 2 minutos</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Cartão de Crédito</CardDescription>
          <CardTitle className="@[250px]/card:text-2xl text-xl font-semibold tabular-nums">
            {showBalance ? "R$ " + account.credit_limit : "R$ ••••••"}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <CreditCardIcon className="h-5 w-5 text-purple-600" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">Limite disponível</div>
          <div className="text-xs text-muted-foreground">Fatura vence em 15 dias</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Investimentos</CardDescription>
          <CardTitle className="@[250px]/card:text-2xl text-xl font-semibold tabular-nums">
            {showBalance ? "R$ 15.230,45" : "R$ ••••••"}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs bg-green-50 text-green-700 border-green-200"
            >
              <TrendingUpIcon className="size-3" />
              +2.3%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-green-600">
            Rendimento no mês <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">CDB, Tesouro e Ações</div>
        </CardFooter>
      </Card>
    </div>
  )
}
