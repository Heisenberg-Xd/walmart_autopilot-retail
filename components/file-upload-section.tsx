"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, AlertCircle, X, Eye } from "lucide-react"

interface Dataset {
  id: string
  name: string
  description: string
  icon: any
  schema: Array<{
    name: string
    type: string
    example: string
  }>
  color: string
}

interface FileUploadSectionProps {
  dataset: Dataset
}

export function FileUploadSection({ dataset }: FileUploadSectionProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [previewData, setPreviewData] = useState<any[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        setErrorMessage("Please select a valid CSV file")
        setUploadStatus("error")
        return
      }

      if (selectedFile.size > 50 * 1024 * 1024) {
        // 50MB limit
        setErrorMessage("File size must be less than 50MB")
        setUploadStatus("error")
        return
      }

      setFile(selectedFile)
      setUploadStatus("idle")
      setErrorMessage("")
      setPreviewData([])
      setShowPreview(false)
    }
  }

  const parseCSV = (csvText: string) => {
    const lines = csvText.split("\n").filter((line) => line.trim())
    if (lines.length < 2) return []

    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
    const data = []

    for (let i = 1; i < Math.min(6, lines.length); i++) {
      // Preview first 5 rows
      const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
      const row: any = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ""
      })
      data.push(row)
    }

    return data
  }

  const handlePreview = async () => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const csvText = e.target?.result as string
      const parsed = parseCSV(csvText)
      setPreviewData(parsed)
      setShowPreview(true)
    }
    reader.readAsText(file)
  }

  const validateSchema = (data: any[]) => {
    if (data.length === 0) return { valid: false, error: "No data found in file" }

    const fileHeaders = Object.keys(data[0])
    const requiredHeaders = dataset.schema.map((field) => field.name)

    const missingHeaders = requiredHeaders.filter((header) => !fileHeaders.includes(header))
    if (missingHeaders.length > 0) {
      return {
        valid: false,
        error: `Missing required columns: ${missingHeaders.join(", ")}`,
      }
    }

    return { valid: true, error: "" }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadProgress(0)

    try {
      // Simulate file reading and validation
      const reader = new FileReader()
      reader.onload = async (e) => {
        const csvText = e.target?.result as string
        const parsed = parseCSV(csvText)

        // Validate schema
        const validation = validateSchema(parsed)
        if (!validation.valid) {
          setErrorMessage(validation.error)
          setUploadStatus("error")
          setUploading(false)
          return
        }

        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress(i)
          await new Promise((resolve) => setTimeout(resolve, 100))
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setUploadStatus("success")
        setUploading(false)
        setUploadProgress(100)
      }
      reader.readAsText(file)
    } catch (error) {
      setErrorMessage("Upload failed. Please try again.")
      setUploadStatus("error")
      setUploading(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setUploading(false)
    setUploadProgress(0)
    setUploadStatus("idle")
    setErrorMessage("")
    setPreviewData([])
    setShowPreview(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${dataset.color} text-white`}>
              <dataset.icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{dataset.name}</CardTitle>
              <CardDescription className="text-sm">{dataset.description}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {dataset.schema.length} fields
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Schema Information */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <p className="text-sm font-medium mb-2">Required Schema:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {dataset.schema.map((field, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-mono text-blue-600 dark:text-blue-400">{field.name}</span>
                <span className="text-gray-500">{field.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* File Upload Area */}
        <div className="space-y-3">
          <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileSelect} className="hidden" />

          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Click to select CSV file or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">Maximum file size: 50MB</p>
            </div>
          ) : (
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={resetUpload} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {file && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
              disabled={uploading}
              className="flex-1 bg-transparent"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Data
            </Button>
            <Button onClick={handleUpload} disabled={uploading} className="flex-1">
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Data
                </>
              )}
            </Button>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Upload Progress</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {/* Status Messages */}
        {uploadStatus === "success" && (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-300">
              File uploaded successfully! Data has been processed and integrated into the system.
            </AlertDescription>
          </Alert>
        )}

        {uploadStatus === "error" && (
          <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-300">{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Data Preview */}
        {showPreview && previewData.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Data Preview (First 5 rows):</p>
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    {Object.keys(previewData[0]).map((header, index) => (
                      <th key={index} className="px-2 py-1 text-left border-r border-gray-200 dark:border-gray-700">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t border-gray-200 dark:border-gray-700">
                      {Object.values(row).map((value: any, colIndex) => (
                        <td key={colIndex} className="px-2 py-1 border-r border-gray-200 dark:border-gray-700">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
