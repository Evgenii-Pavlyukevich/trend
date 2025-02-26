# YouTube Shorts Trend Prediction Algorithm Flow

## 1. User Input Flow
```mermaid
graph TD
    A[User] -->|Selects| B[Niche]
    A -->|Selects| C[Sub-niche]
    A -->|Selects| D[Time Window]
    B & C & D -->|Combined| E[Search Parameters]
    E -->|Triggers| F[Data Collection]
```

## 2. Data Collection Process
```mermaid
graph TD
    A[Search Parameters] -->|YouTube API| B[Search for Shorts]
    B -->|Video IDs| C[Fetch Statistics]
    C -->|Raw Data| D[Calculate Metrics]
    D -->|Store| E[Firestore Database]
    D -->|Process| F[ML Input]
    
    subgraph Metrics Calculation
    D -->|Formula 1| G[View Velocity]
    D -->|Formula 2| H[Engagement Rate]
    end
```

## 3. ML Pipeline
```mermaid
graph TD
    A[ML Input] -->|Normalize| B[Feature Processing]
    B -->|TensorFlow.js| C[Neural Network]
    C -->|Predict| D[Virality Score]
    C -->|Analyze| E[Feature Importance]
    D & E -->|Combine| F[Prediction Results]
```

## 4. Data Flow
```mermaid
sequenceDiagram
    participant U as User Interface
    participant S as PredictionService
    participant Y as YouTube API
    participant ML as ML Model
    participant DB as Firestore

    U->>S: predictTrends(niche, timeWindow)
    S->>Y: fetchShortsData()
    Y-->>S: raw video data
    S->>DB: storeShorts()
    S->>ML: predict()
    ML-->>S: predictions
    S->>U: sorted results
```

## 5. Feature Processing
- **Input Features**:
  * viewCount
  * likeCount
  * commentCount
  * shareCount
  * viewVelocity
  * engagementRate

- **Derived Metrics**:
  * viewVelocity = viewCount / hoursSincePublished
  * engagementRate = (likes + comments) / views
  * confidence = 1 - 2 * |0.5 - score|

## 6. Virality Thresholds
```typescript
const isViral = 
  viewVelocity > 1000 || // More than 1000 views per hour
  engagementRate > 0.1   // More than 10% engagement rate
```

## 7. Model Architecture
```mermaid
graph TD
    A[Input Layer: 6 features] -->|ReLU| B[Hidden Layer 1: 12 units]
    B -->|ReLU| C[Hidden Layer 2: 8 units]
    C -->|Dropout 0.2| D[Hidden Layer 3: 4 units]
    D -->|Sigmoid| E[Output Layer: Virality Score]
```

## 8. Output Processing
```mermaid
graph TD
    A[Raw Predictions] -->|Sort| B[Rank by Virality]
    A -->|Analyze| C[Feature Importance]
    A -->|Calculate| D[Confidence Scores]
    B & C & D -->|Combine| E[Final Results]
``` 