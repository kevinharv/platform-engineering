export type Environment = 'sandbox' | 'dev' | 'qa' | 'prod';
export type NetworkZone = 'public' | 'private' | 'data' | 'pci';
export type DataCenter = 'da1' | 'da2' | 'ch3' | 'va7' | 'auto';
export type OSFamily = 'linux' | 'windows';
export type Tier = 'ui' | 'api' | 'control-plane' | 'execution-plane' | 'db' | 'other';
export type PatchingDay = 'su' | 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa';
export type PatchingWindow = '0100-0400' | '0500-0800' | '0900-1200' | '1300-1600' | '1700-2000' | '2100-0000';

export interface Tag {
  key: string;
  value: string;
}

export interface VMRequestFormData {
  application: string;
  customID: string;
  hostname: string;
  environment: Environment;
  networkZone: NetworkZone;
  dataCenter: DataCenter;
  osFamily: OSFamily;
  osVersion: string;
  tier: Tier;
  patchingDay: PatchingDay;
  patchingWindow: PatchingWindow;
  costCenter: string;
  quantity: number;
  tags: Tag[];
  monthlyCost: number;
}

export const INITIAL_FORM_DATA: VMRequestFormData = {
  application: '',
  customID: '',
  hostname: '',
  environment: 'dev',
  networkZone: 'private',
  dataCenter: 'da1',
  osFamily: 'linux',
  osVersion: 'rhel-9',
  tier: 'ui',
  patchingDay: 'mo',
  patchingWindow: '0100-0400',
  costCenter: '',
  quantity: 1,
  tags: [{ key: '', value: '' }],
  monthlyCost: 0
};