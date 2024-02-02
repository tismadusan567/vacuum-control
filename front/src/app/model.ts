export interface LoginResponse {
    jwt: string,
    permissions: string[]
}

export interface User {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    permissions: number,
    permissionsAsList: [string]
}

export interface Vacuum {
    vacuumId: number,
    name: string,
    status: string,
    active: boolean,
    dateAdded: string,
    addedByUserId: number,
    version: number
}

export interface EntityExtractionResponse {
    annotations: Annotation[]
}

export interface Annotation {
    label: string,
    confidence: number,
    abstract?: string,
    categories?: string[],
    image?: {
        full: string,
        thumbnail: string
    }
}

export interface TextSimilarityResponse {
    langConfidence: number,
    similarity: number
}

export interface LanguageDetectionResponse {
    detectedLangs: Lang[]
}

export interface Lang {
    lang: string,
    confidence: number
}

export interface SentimentAnalysisResponse {
    sentiment: {
        type: string,
        score: number
    }
}