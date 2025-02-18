"use client"

import type React from "react"
import { HexColorPicker } from "react-colorful"

interface ColorPickerProps {
  id: string
  color: string
  onChange: (color: string) => void
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ id, color, onChange }) => {
  return (
    <div>
      <HexColorPicker color={color} onChange={onChange} />
      <input
        id={id}
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full px-3 py-2 text-sm border rounded-md"
      />
    </div>
  )
}

