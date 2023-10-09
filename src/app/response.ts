export interface ApiResponse<T> {
  parameters: { league: string; season: string };
  response: T;
}
