import React, { ReactNode } from "react";
import { casbinAuthorizer } from "@/utils/config";

type Props = {
  children: ReactNode;
  action: string;
  subject: string;
};

const Can: React.FC<Props> = ({ children, action, subject }) => {
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    if (!casbinAuthorizer) {
      return;
    }
    (async function () {
      const shouldRender = await casbinAuthorizer.can(action, subject);
      console.log(shouldRender);
      setRender(shouldRender);
    })();
  }, [action, subject]);

  if (render) return <>{children}</>;

  return null;
};

export default Can;
