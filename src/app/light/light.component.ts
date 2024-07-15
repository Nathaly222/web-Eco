import { Component, OnInit } from '@angular/core';
import { ConsumptionService } from '../consumption.service';
import { Consumption } from '../consumption.Interface';
import { CommonModule } from '@angular/common';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-light',
  standalone: true,
  imports: [
    NzTableComponent, 
    CommonModule, 
    NzDividerModule,
    HttpClientModule,
    NzTableModule,
    NzCardModule,
    NzButtonModule,
    NzModalModule,
    NzPopconfirmModule,
    NzFormModule,
    NzInputNumberModule,
    NzDatePickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  consumption: Consumption[] = [];
  isModalVisible = false;
  modalTitle = '';
  consumptionForm: FormGroup;

  constructor(
    private consumptionService: ConsumptionService,
    private fb: FormBuilder
  ) {
    this.consumptionForm = this.fb.group({
      nameClient: [null, Validators.required],
      codUniqueElectric: [null, [Validators.required, Validators.min(0)]],
      meterNumber: [null, [Validators.required, Validators.min(0)]],
      typeConsumption: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      description: [null],
      previousReading: [null, [Validators.required, Validators.min(0)]],
      currentReading: [null, [Validators.required, Validators.min(0)]],
      contractAccount: [null, [Validators.required, Validators.min(0)]],
      billedDays: [null, [Validators.required, Validators.min(0)]],
      consumptionTotal: [null, [Validators.required, Validators.min(0)]],
      total: [null, [Validators.required, Validators.min(0)]]
    });
  }

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

  showAddModal(): void {
    this.modalTitle = 'Agregar Consumo';
    this.consumptionForm.reset();
    this.isModalVisible = true;
  }

  showEditModal(data: Consumption): void {
    this.modalTitle = 'Editar Consumo';
    this.consumptionForm.patchValue({
      nameClient: data.nameClient,
      codUniqueElectric: data.codUniqueElectric,
      meterNumber: data.meterNumber,
      typeConsumption: data.typeConsumption,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      description: data.description,
      previousReading: data.previousReading,
      currentReading: data.currentReading,
      contractAccount: data.contractAccount,
      billedDays: data.billedDays,
      consumptionTotal: data.consumptionTotal,
      total: data.total
    });
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.consumptionForm.valid) {
      const formData = this.consumptionForm.value;
      if (this.modalTitle === 'Agregar Consumo') {
        this.addConsumption(formData);
      } else {
        // Asume que estás editando el último consumo seleccionado
        this.updateConsumption(this.consumption[this.consumption.length - 1].id, formData);
      }
      this.isModalVisible = false;
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }
}