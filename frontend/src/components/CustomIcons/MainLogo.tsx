import Image from "next/image"
import { useTheme } from "next-themes"

import { CONSTANTS, getMainLogoSrc } from "~/utils"

export const MainLogo = () => {
  const { resolvedTheme } = useTheme()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "0px 0px 0px 0px",
        padding: "0px 0px 0px 0px",
      }}
    >
      <Image src={getMainLogoSrc(resolvedTheme)} alt={CONSTANTS.APPLICATION_TITLE} width={200} height={83} />
    </div>
  )
}
