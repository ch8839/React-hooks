const getArrowStyle = (placement: string) => {
  const firstPlacement = placement.split("-")[0]
  switch (firstPlacement) {
      case "right":
          return {
              left: "0",
              top: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
          }
      case "left":
          return {
              right: "0",
              top: "50%",
              transform: "translate(50%, -50%) rotate(45deg)",
          }
      case "top":
          return {
              bottom: "0",
              left: "50%",
              transform: "translate(-50%, 50%) rotate(45deg)",
          }
      case "bottom":
          return {
              top: "0",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
          }
      default:
          return {
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
          }
  }
}