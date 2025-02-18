"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useDragControls, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ColorPicker } from "@/components/ui/color-picker"
import { FontSelect } from "@/components/ui/font-select"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignCenterIcon as AlignTop,
  AlignCenterIcon as AlignMiddle,
  AlignCenterIcon as AlignBottom,
  Grid,
  Type,
  ImageIcon,
  Trash2,
  Copy,
  ZoomIn,
  ZoomOut,
  Undo,
  Redo,
  RotateCcw,
  Lock,
  Unlock,
} from "lucide-react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"

interface DesignElement {
  id: string
  type: "text" | "image"
  content: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  fontSize?: number
  fontFamily?: string
  color?: string
  zIndex: number
  locked: boolean
}

interface InteractiveDesignEditorProps {
  productImage: string
  productDimensions: { width: number; height: number }
  onDesignUpdate: (elements: DesignElement[]) => void
}

export const InteractiveDesignEditor: React.FC<InteractiveDesignEditorProps> = ({
  productImage,
  productDimensions,
  onDesignUpdate,
}) => {
  const [elements, setElements] = useState<DesignElement[]>([])
  const [selectedElement, setSelectedElement] = useState<DesignElement | null>(null)
  const [isGridVisible, setIsGridVisible] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [history, setHistory] = useState<DesignElement[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const canvasRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  const controls = useAnimation()

  useEffect(() => {
    onDesignUpdate(elements)
  }, [elements, onDesignUpdate])

  const addToHistory = useCallback(
    (newElements: DesignElement[]) => {
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), newElements])
      setHistoryIndex((prev) => prev + 1)
    },
    [historyIndex],
  )

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1)
      setElements(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1)
      setElements(history[historyIndex + 1])
    }
  }

  const addTextElement = () => {
    const newElement: DesignElement = {
      id: `text-${Date.now()}`,
      type: "text",
      content: "New Text",
      x: productDimensions.width / 2,
      y: productDimensions.height / 2,
      width: 100,
      height: 30,
      rotation: 0,
      fontSize: 16,
      fontFamily: "Arial",
      color: "#000000",
      zIndex: elements.length,
      locked: false,
    }
    const newElements = [...elements, newElement]
    setElements(newElements)
    setSelectedElement(newElement)
    addToHistory(newElements)
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newElement: DesignElement = {
            id: `image-${Date.now()}`,
            type: "image",
            content: e.target?.result as string,
            x: productDimensions.width / 2,
            y: productDimensions.height / 2,
            width: 100,
            height: 100,
            rotation: 0,
            zIndex: elements.length,
            locked: false,
          }
          const newElements = [...elements, newElement]
          setElements(newElements)
          setSelectedElement(newElement)
          addToHistory(newElements)
        }
        reader.readAsDataURL(file)
      })
    },
    [elements, productDimensions.width, productDimensions.height, addToHistory],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const updateElement = useCallback(
    (updatedElement: DesignElement) => {
      const newElements = elements.map((el) => (el.id === updatedElement.id ? updatedElement : el))
      setElements(newElements)
      setSelectedElement(updatedElement)
      addToHistory(newElements)
    },
    [elements, addToHistory],
  )

  const handleDragStart = (event: React.PointerEvent, element: DesignElement) => {
    if (element.locked) return
    dragControls.start(event, { snapToCursor: false })
    setSelectedElement(element)
  }

  const handleDrag = (event: any, info: any, element: DesignElement) => {
    if (element.locked) return
    const updatedElement = { ...element, x: info.point.x, y: info.point.y }
    updateElement(updatedElement)
  }

  const handleResize = (event: React.PointerEvent, element: DesignElement, corner: string) => {
    if (element.locked) return
    const startX = event.clientX
    const startY = event.clientY
    const startWidth = element.width
    const startHeight = element.height

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      let newWidth = startWidth
      let newHeight = startHeight

      switch (corner) {
        case "topLeft":
        case "bottomLeft":
          newWidth = startWidth - dx
          break
        case "topRight":
        case "bottomRight":
          newWidth = startWidth + dx
          break
      }

      switch (corner) {
        case "topLeft":
        case "topRight":
          newHeight = startHeight - dy
          break
        case "bottomLeft":
        case "bottomRight":
          newHeight = startHeight + dy
          break
      }

      const updatedElement = { ...element, width: newWidth, height: newHeight }
      updateElement(updatedElement)
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleRotation = (event: React.PointerEvent, element: DesignElement) => {
    if (element.locked) return
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const handleMouseMove = (e: MouseEvent) => {
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
      const rotation = angle * (180 / Math.PI)
      const updatedElement = { ...element, rotation }
      updateElement(updatedElement)
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleAlignment = (alignment: string) => {
    if (!selectedElement || !canvasRef.current) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    const updatedElement = { ...selectedElement }

    switch (alignment) {
      case "left":
        updatedElement.x = 0
        break
      case "center":
        updatedElement.x = (canvasRect.width - updatedElement.width) / 2
        break
      case "right":
        updatedElement.x = canvasRect.width - updatedElement.width
        break
      case "top":
        updatedElement.y = 0
        break
      case "middle":
        updatedElement.y = (canvasRect.height - updatedElement.height) / 2
        break
      case "bottom":
        updatedElement.y = canvasRect.height - updatedElement.height
        break
    }

    updateElement(updatedElement)
  }

  const handleDelete = () => {
    if (selectedElement) {
      const newElements = elements.filter((el) => el.id !== selectedElement.id)
      setElements(newElements)
      setSelectedElement(null)
      addToHistory(newElements)
    }
  }

  const handleDuplicate = () => {
    if (selectedElement) {
      const newElement = {
        ...selectedElement,
        id: `${selectedElement.type}-${Date.now()}`,
        x: selectedElement.x + 10,
        y: selectedElement.y + 10,
        zIndex: elements.length,
      }
      const newElements = [...elements, newElement]
      setElements(newElements)
      setSelectedElement(newElement)
      addToHistory(newElements)
    }
  }

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prevZoom) => {
      const newZoom = direction === "in" ? prevZoom * 1.1 : prevZoom / 1.1
      return Math.max(0.5, Math.min(newZoom, 2))
    })
  }

  const handleReset = () => {
    setElements([])
    setSelectedElement(null)
    addToHistory([])
  }

  const toggleLock = () => {
    if (selectedElement) {
      const updatedElement = { ...selectedElement, locked: !selectedElement.locked }
      updateElement(updatedElement)
    }
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div
            ref={canvasRef}
            className="relative border border-gray-300 overflow-hidden"
            style={{
              width: productDimensions.width,
              height: productDimensions.height,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Image src={productImage || "/placeholder.svg"} alt="Product" layout="fill" objectFit="contain" />
            {isGridVisible && (
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className="border border-gray-200 opacity-50" />
                ))}
              </div>
            )}
            {elements.map((element) => (
              <motion.div
                key={element.id}
                drag={!element.locked}
                dragControls={dragControls}
                onDragStart={(event) => handleDragStart(event as React.PointerEvent, element)}
                onDrag={(event, info) => handleDrag(event, info, element)}
                dragMomentum={false}
                style={{
                  position: "absolute",
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  rotate: element.rotation,
                  cursor: element.locked ? "not-allowed" : "move",
                  zIndex: element.zIndex,
                }}
                animate={controls}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {element.type === "text" ? (
                  <div
                    style={{
                      fontSize: element.fontSize,
                      fontFamily: element.fontFamily,
                      color: element.color,
                    }}
                  >
                    {element.content}
                  </div>
                ) : (
                  <Image src={element.content || "/placeholder.svg"} alt="Uploaded" layout="fill" objectFit="contain" />
                )}
                {selectedElement?.id === element.id && !element.locked && (
                  <>
                    <div
                      className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full cursor-nwse-resize"
                      onPointerDown={(e) => handleResize(e, element, "topLeft")}
                    />
                    <div
                      className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full cursor-nesw-resize"
                      onPointerDown={(e) => handleResize(e, element, "topRight")}
                    />
                    <div
                      className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-500 rounded-full cursor-nesw-resize"
                      onPointerDown={(e) => handleResize(e, element, "bottomLeft")}
                    />
                    <div
                      className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-500 rounded-full cursor-nwse-resize"
                      onPointerDown={(e) => handleResize(e, element, "bottomRight")}
                    />
                    <div
                      className="absolute top-1/2 -right-6 w-4 h-4 bg-blue-500 rounded-full cursor-ew-resize"
                      onPointerDown={(e) => handleRotation(e, element)}
                    />
                  </>
                )}
              </motion.div>
            ))}
            {isDragActive && (
              <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                <p className="text-white text-2xl font-bold">Drop image here</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <Tooltip content="Zoom In">
                <Button variant="outline" size="icon" onClick={() => handleZoom("in")}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </Tooltip>
              <Tooltip content="Zoom Out">
                <Button variant="outline" size="icon" onClick={() => handleZoom("out")}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </Tooltip>
            </div>
            <Tooltip content="Toggle Grid">
              <Button variant="outline" size="icon" onClick={() => setIsGridVisible(!isGridVisible)}>
                <Grid className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="w-full md:w-64 space-y-4">
          <div className="flex space-x-2">
            <Tooltip content="Add Text">
              <Button onClick={addTextElement} size="icon">
                <Type className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Add Image">
              <Button size="icon" onClick={() => document.getElementById("image-upload")?.click()}>
                <ImageIcon className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Input id="image-upload" type="file" accept="image/*" onChange={onDrop} className="hidden" />
          </div>
          <div className="flex space-x-2">
            <Tooltip content="Undo">
              <Button variant="outline" size="icon" onClick={undo}>
                <Undo className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Redo">
              <Button variant="outline" size="icon" onClick={redo}>
                <Redo className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Reset">
              <Button variant="outline" size="icon" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
          {selectedElement && (
            <>
              <div className="flex space-x-2">
                <Tooltip content="Delete">
                  <Button variant="outline" size="icon" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Tooltip>
                <Tooltip content="Duplicate">
                  <Button variant="outline" size="icon" onClick={handleDuplicate}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </Tooltip>
                <Tooltip content={selectedElement.locked ? "Unlock" : "Lock"}>
                  <Button variant="outline" size="icon" onClick={toggleLock}>
                    {selectedElement.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  </Button>
                </Tooltip>
              </div>
              <ToggleGroup type="single" size="sm">
                <ToggleGroupItem value="left" onClick={() => handleAlignment("left")}>
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" onClick={() => handleAlignment("center")}>
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" onClick={() => handleAlignment("right")}>
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="top" onClick={() => handleAlignment("top")}>
                  <AlignTop className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="middle" onClick={() => handleAlignment("middle")}>
                  <AlignMiddle className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="bottom" onClick={() => handleAlignment("bottom")}>
                  <AlignBottom className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              {selectedElement.type === "text" && (
                <>
                  <Label htmlFor="text-content">Text Content</Label>
                  <Input
                    id="text-content"
                    value={selectedElement.content}
                    onChange={(e) => updateElement({ ...selectedElement, content: e.target.value })}
                  />
                  <Label htmlFor="font-size">Font Size</Label>
                  <Slider
                    id="font-size"
                    min={8}
                    max={72}
                    step={1}
                    value={[selectedElement.fontSize || 16]}
                    onValueChange={(value) => updateElement({ ...selectedElement, fontSize: value[0] })}
                  />
                  <Label htmlFor="font-family">Font Family</Label>
                  <FontSelect
                    id="font-family"
                    value={selectedElement.fontFamily || ""}
                    onChange={(value) => updateElement({ ...selectedElement, fontFamily: value })}
                  />
                  <Label htmlFor="text-color">Text Color</Label>
                  <ColorPicker
                    id="text-color"
                    color={selectedElement.color || "#000000"}
                    onChange={(color) => updateElement({ ...selectedElement, color })}
                  />
                </>
              )}
              <Label htmlFor="rotation">Rotation</Label>
              <Slider
                id="rotation"
                min={0}
                max={360}
                step={1}
                value={[selectedElement.rotation]}
                onValueChange={(value) => updateElement({ ...selectedElement, rotation: value[0] })}
              />
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}

