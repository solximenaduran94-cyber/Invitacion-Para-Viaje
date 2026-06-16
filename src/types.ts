/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Destination = 'calafate' | 'bariloche';

export interface TravelResponse {
  choice: Destination | null;
  dreams: string;
  confirmed: boolean;
  opened: boolean;
  milagrosName: string;
}

export interface Activity {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
}

export interface DestinationDetails {
  id: Destination;
  title: string;
  province: string;
  poeticSubtitle: string;
  description: string;
  paragraphs: string[];
  imageSrc: string;
  themeColor: string;
  accentColor: string;
  highlights: string[];
  poeticQuote: string;
  activities?: Activity[];
}
