declare module '@/data/*.json' {
  const value: {
    reports: Array<{
      id: string;
      coords: {
        lat: number;
        lng: number;
      };
      category: string;
      description: string;
      status: string;
      createdAt: string;
    }>;
  };
  export default value;
} 