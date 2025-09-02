import { Button } from "@workspace/ui/components/button"
import { calculateDiscount } from "../../../packages/lib"

export default function Page() {
  const x = calculateDiscount(100, 0.2);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello Web</h1>
        <Button size="sm">Button {x} </Button>
      </div>
    </div>
  )
}
