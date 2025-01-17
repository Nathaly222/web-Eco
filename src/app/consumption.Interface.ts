export interface Consumption {
    id: number;
    nameClient: string;
    codUniqueElectric: number;
    meterNumber: number;
    typeConsumption: string; 
    startDate: string;
    endDate: string;
    description: string;
    previousReading: number;
    currentReading: number;
    contractAccount: number;
    billedDays: number;
    consumptionTotal: number; 
    total: number;
}
