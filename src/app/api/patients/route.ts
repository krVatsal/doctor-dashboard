import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Type for a patient
export interface Patient {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string | null;
  contact: Array<{ address: string | null; number: string | null; email: string | null }>;
  medical_issue: string;
}

// Helper to read the JSON file
async function getPatients(): Promise<Patient[]> {
  const filePath = path.join(process.cwd(), 'public', 'MOCK_DATA 1.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';
  const filterIssue = searchParams.get('medical_issue') || '';
  const filterAge = searchParams.get('age') || '';

  let patients = await getPatients();

  // Search
  if (search) {
    patients = patients.filter(p =>
      p.patient_name.toLowerCase().includes(search) ||
      p.medical_issue.toLowerCase().includes(search) ||
      p.contact[0]?.email?.toLowerCase().includes(search)
    );
  }

  // Filter by medical_issue
  if (filterIssue) {
    patients = patients.filter(p => p.medical_issue === filterIssue);
  }

  // Filter by age
  if (filterAge) {
    patients = patients.filter(p => p.age === parseInt(filterAge, 10));
  }

  // Sort
  if (sort) {
    patients = patients.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;
      
      switch (sort) {
        case 'patient_name':
          aValue = a.patient_name;
          bValue = b.patient_name;
          break;
        case 'age':
          aValue = a.age;
          bValue = b.age;
          break;
        case 'medical_issue':
          aValue = a.medical_issue;
          bValue = b.medical_issue;
          break;
        case 'patient_id':
          aValue = a.patient_id;
          bValue = b.patient_id;
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = patients.slice(start, end);

  return NextResponse.json({
    data: paginated,
    total: patients.length,
    page,
    limit
  });
}
