export type AppStatus = 'idle' | 'loading' | 'success' | 'error'

export interface AppError {
  message: string
  statusCode?: number
  details?: string
}

export interface RepoInputForm {
  owner: string
  repo: string
}

export interface AnalysisState {
  status: AppStatus
  error: AppError | null
  isAnalyzing: boolean
}

export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

export interface ApiErrorResponse {
  success: false
  error: string
  statusCode: number
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse
