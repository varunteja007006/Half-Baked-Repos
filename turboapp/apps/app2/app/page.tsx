import { Button } from "@workspace/ui/components/button"
import Brand from "@workspace/ui/common/Brand"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello App2</h1>
        <Brand message={"varun"}  />
        <Button size="sm">Button</Button>
      </div>
    </div>
  )
}
