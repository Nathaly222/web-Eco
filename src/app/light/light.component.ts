import { Component, OnInit } from '@angular/core';
import { ConsumptionService } from '../consumption.service';
import { Consumption } from '../consumption.Interface';
import { CommonModule } from '@angular/common';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-light',
  standalone: true,
  imports: [NzTableComponent, CommonModule, HttpClientModule],
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  consumption: Consumption[] = [];

  constructor(private consumptionService: ConsumptionService) {}

  ngOnInit(): void {
    this.fetchConsumption();
  }

  fetchConsumption(): void {
    this.consumptionService.getLightConsumption().subscribe({
      next: (response: Consumption[]) => {
        this.consumption = response;
        console.log('Datos de consumo de energía:', this.consumption);
      },
      error: (error: any) => {
        console.error('Error al cargar los datos de consumo:', error);
      }
    });
  }

  addConsumption(consumption: Consumption): void {
    this.consumptionService.createLightConsumption(consumption).subscribe({
      next: (response: Consumption) => {
        console.log('Consumo de luz agregado exitosamente:', response);
        this.consumption.push(response); 
      },
      error: (error: any) => {
        console.error('Error al agregar consumo de luz:', error);
      }
    });
  }

  updateConsumption(id: number, consumption: Consumption): void {
    this.consumptionService.updateLightConsumption(id, consumption).subscribe({
      next: (response: Consumption) => {
        console.log('Consumo de luz actualizado exitosamente:', response);
        const index = this.consumption.findIndex(c => c.id === id);
        if (index !== -1) {
          this.consumption[index] = response;
        }
      },
      error: (error: any) => {
        console.error('Error al actualizar consumo de luz:', error);
      }
    });
  }

  deleteConsumption(id: number): void {
    this.consumptionService.deleteLightConsumption(id).subscribe({
      next: () => {
        console.log('Consumo de luz eliminado exitosamente');
        this.consumption = this.consumption.filter(c => c.id !== id);
      },
      error: (error: any) => {
        console.error('Error al eliminar consumo de luz:', error);
      }
    });
  }

  fetchConsumptionById(id: number): void {
    this.consumptionService.getLightConsumptionById(id).subscribe({
      next: (response: Consumption) => {
        console.log('Detalles del consumo de luz:', response);
      },
      error: (error: any) => {
        console.error('Error al obtener detalles del consumo de luz:', error);
      }
    });
  }
}