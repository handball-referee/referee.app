import React, { FunctionComponent } from "react";

interface Props {
  error?: Error|null;
}

const Loading: FunctionComponent<Props> = ({ error = null }) => {
  if (error) {
    console.log(error); // eslint-disable-line
  }
  return (
    <div className="spinner-wrapper flex flex-col items-center p-12">
      <svg viewBox="0 0 512 512" className="spinner w-20 h-20 mb-4">
        <ellipse className="fill-white" cx="255.38" cy="256.5" rx="255.38" ry="252.5" />
        <path className="fill-green-300" d="M244,200.09c2.1-.83,3.34.47,4.62,2.28q24.76,35.1,49.67,70.1c1.32,1.85,1.26,3.21.33,5.14q-18.43,38.7-36.69,77.5a4.54,4.54,0,0,1-4.3,3q-31.65,2.58-63.29,5.33c-7.77.66-15.54,1.29-23.29,2.08a4,4,0,0,1-4.27-2q-25.08-35.56-50.32-71a3.28,3.28,0,0,1-.37-3.84q18.74-39.36,37.3-78.79a3.61,3.61,0,0,1,3.44-2.37C185.75,205.08,214.71,202.59,244,200.09Z" />
        <path className="animate-loading animation-delay-100 fill-orange-300" d="M310.47,268a6.9,6.9,0,0,1-1.94-1.51q-25.54-36-50.95-72a4.47,4.47,0,0,1-.38-3.58c9.3-24.17,18.73-48.29,28.07-72.45a3.25,3.25,0,0,1,3.35-2.38c24.71-1.24,49.41-2.57,74.12-3.84,3.44-.18,7.41-1.27,10.18,0s4.1,5.08,6,7.81q22.19,31.32,44.39,62.62a4.67,4.67,0,0,1,.61,5.16q-14.42,35-28.6,70.1a3.64,3.64,0,0,1-3.54,2.62q-40,3.58-79.93,7.31Z" />
        <path className="animate-loading animation-delay-[400ms] fill-green-200" d="M328.6,417.15c-4.63,8.21-9.16,16.26-13.7,24.29-4.09,7.22-8.13,14.46-12.38,21.59a6.31,6.31,0,0,1-3.62,2.66c-28.6,6.49-57.24,12.84-85.85,19.28a4.06,4.06,0,0,1-4.09-1.12Q181.3,459,153.51,434.27a3.72,3.72,0,0,1-1.23-4.65q8.43-24.87,16.63-49.83c.64-1.94,1.58-2.61,3.63-2.78,29.25-2.43,58.49-5,87.74-7.4a6.86,6.86,0,0,1,4.23,1q31.38,22.61,62.64,45.37C327.53,416.27,327.89,416.58,328.6,417.15Z" />
        <path className="animate-loading animation-delay-[600ms] fill-blue-300" d="M52.81,299.48C49.4,292.33,46,285.3,42.7,278.26c-6.75-14.2-13.45-28.42-20.25-42.6a5,5,0,0,1,0-5q23.26-45,46.36-90a3.89,3.89,0,0,1,3.43-2.45q25.43-2.52,50.84-5.2c1.71-.18,2.36.39,2.79,2,5.91,21.75,11.9,43.49,17.8,65.26a5.11,5.11,0,0,1-.43,3.22Q124.2,243.89,105,284.27a4.32,4.32,0,0,1-2.27,2.26C86.16,290.9,69.6,295.15,52.81,299.48Z" />
        <path className="animate-loading animation-delay-200 fill-organge-200" d="M393.66,272.28c1.31,6.86,2.63,13.65,3.91,20.44,3.65,19.44,7.26,38.89,11,58.31a4.14,4.14,0,0,1-1.85,4.78q-34.18,25.32-68.23,50.82c-1.6,1.2-2.61,1.17-4.21,0q-29.94-21.87-60-43.56c-1.7-1.22-2.08-2.14-1.13-4.13,12.21-25.63,24.3-51.31,36.52-76.92a4.59,4.59,0,0,1,3-2.35c26.33-2.55,52.67-5,79-7.39C392.23,272.23,392.8,272.28,393.66,272.28Z" />
        <path className="fill-red-300" d="M502.65,273.14c-1.64,21.39-5.4,41.74-12.33,61.43-2.88,8.16-6.39,16.1-9.51,24.17-.81,2.1-1.95,2.5-4.15,2.12q-26.58-4.62-53.22-9c-2-.33-2.89-1.1-3.27-3.15-4.91-26.46-9.95-52.9-14.84-79.37a10.88,10.88,0,0,1,.57-5.73c9.47-23.49,19.1-46.92,28.59-70.4.82-2,1.73-2.65,4-2.43q15.07,1.49,30.2,2.56a4.51,4.51,0,0,1,4.55,3.33c9.43,24.53,19,49,28.48,73.51C502.14,271.36,502.46,272.54,502.65,273.14Z" />
        <path className="fill-orange-100" d="M206.93,64.78c2.17-5.68,4.26-11.19,6.38-16.68,4-10.3,7.9-20.62,12-30.87a4.44,4.44,0,0,1,2.92-2.41A249.09,249.09,0,0,1,348.52,31a12.8,12.8,0,0,1,6,4.63c7.4,10.2,14.93,20.3,22.31,30.51a5.09,5.09,0,0,1,.9,3.58c-1.91,9.31-4.05,18.58-6,27.89-.41,2-1.33,2.54-3.28,2.64-27.68,1.37-55.36,2.82-83,4.2a7.28,7.28,0,0,1-3.57-.7q-36.83-19-73.6-38.15C207.89,65.39,207.58,65.18,206.93,64.78Z" />
        <path className="animate-loading animation-delay-0 fill-green-100" d="M274.49,113.58c-4.93,12.66-9.81,25.16-14.69,37.66-4.43,11.36-8.92,22.69-13.25,34.08-.78,2.05-1.76,3-4.06,3.14-23.59,1.94-47.18,4-70.77,6-4.8.41-9.6.75-14.39,1.24-1.7.17-2.58-.18-3.07-2q-8.55-31.54-17.27-63a3.06,3.06,0,0,1,1.14-3.67q30.26-25.42,60.47-50.86a3.63,3.63,0,0,1,3.19-.54q36,18.51,71.84,37.24A6.8,6.8,0,0,1,274.49,113.58Z" />
        <path className="fill-red-100" d="M314.29,466.62c4.55-8.06,9-15.94,13.43-23.81,4-7.13,8.06-14.28,12.19-21.37a12.45,12.45,0,0,1,3.16-3.58q36-26.92,72.19-53.71a5.46,5.46,0,0,1,3.6-1.13c17.84,2.93,35.66,6,53.49,9a10.66,10.66,0,0,1,1.34.47c-.51,1-.91,2-1.41,2.84q-39.12,68.94-111.36,102.92a5.67,5.67,0,0,1-3.5.52c-14-3.78-28-7.68-42-11.56A10.22,10.22,0,0,1,314.29,466.62Z" />
        <path className="animate-loading animation-delay-500 fill-blue-100" d="M140.74,426.15c-2.87-1.19-5.61-2.3-8.33-3.45Q96.22,407.37,60,392.08a3.58,3.58,0,0,1-2.63-3.74q-.76-37.06-1.79-74.11c-.08-2.62.74-3.56,3.26-4.19,14.83-3.7,29.61-7.56,44.38-11.46,1.86-.49,2.91-.23,4.06,1.4Q132.35,335.53,157.5,371a4.3,4.3,0,0,1,.67,3.31c-5.48,16.72-11.08,33.4-16.66,50.09C141.34,425,141.06,425.44,140.74,426.15Z" />
        <path className="fill-blue-200" d="M212.46,17.14c-1.87,4.88-3.55,9.3-5.25,13.71-4,10.39-8,20.79-12.07,31.15a9.46,9.46,0,0,1-2.56,3.64q-31.79,26.92-63.68,53.69a7.51,7.51,0,0,1-3.81,1.61c-17.6,1.87-35.21,3.62-52.82,5.47a2.14,2.14,0,0,1-2.68-1.77c-1.9-6-3.84-12-5.89-17.89a3.75,3.75,0,0,1,.81-4.12A248.24,248.24,0,0,1,208.32,17.8C209.52,17.57,210.73,17.41,212.46,17.14Z" />
        <path className="fill-red-200" d="M389.66,73.39l19.72,3.13c4.18.67,8.38,1.23,12.51,2.12a10.26,10.26,0,0,1,4.74,2.26,242.39,242.39,0,0,1,56.94,81.24,4.28,4.28,0,0,1-.45,4.68c-3,4.33-5.8,8.74-8.58,13.19a3.49,3.49,0,0,1-3.74,1.86c-11.3-1-22.62-1.89-33.93-3a4.68,4.68,0,0,1-2.95-1.77q-25.25-35.46-50.32-71a4.57,4.57,0,0,1-.89-3.08c2.05-9.67,4.25-19.31,6.42-29C389.17,73.93,389.35,73.8,389.66,73.39Z" />
        <path className="fill-orange-100" d="M58.62,404.27l37.8,16q21.48,9.09,43,18.23a11.72,11.72,0,0,1,3.2,1.86q30,26.76,59.93,53.59c.48.43.91.93,1.43,1.47-10.09,1.32-57.74-17.65-80.72-32C95.61,446.1,72.69,423.47,58.62,404.27Z" />
        <path className="fill-orange-300" d="M9.76,236.59c3.38,7.08,6.42,13.42,9.44,19.78Q31,281.15,42.68,306a8.53,8.53,0,0,1,.89,3.24q.95,36.49,1.79,73a4.07,4.07,0,0,1-.42,1.91,229,229,0,0,1-26.66-59.05C9,293.81,6.86,259.38,9.76,236.59Z" />
        <path className="fill-blue-100" d="M213,497.08c5.84-1.34,11.67-2.71,17.52-4q36-8,72-16a8.15,8.15,0,0,1,3.64-.07c10.76,2.9,21.49,5.89,32.23,8.87.52.14,1,.35,2.32.8C298.61,501.44,256.34,505.09,213,497.08Z" />
        <path className="fill-organge-200" d="M54.41,116.48c1.69,5.18,3.31,10,4.82,15a3.52,3.52,0,0,1-.26,2.4Q35.28,180,11.51,226.1a2.06,2.06,0,0,1-.38.41C7.39,209.21,37,133.62,54.41,116.48Z" />
        <path className="fill-blue-100" d="M489.76,178.4a219.38,219.38,0,0,1,12,58.73c-.39-.83-.82-1.64-1.15-2.48C495,220.11,489.32,205.59,483.78,191a5.21,5.21,0,0,1,.32-3.87C485.64,184.33,487.57,181.73,489.76,178.4Z" />
        <path className="fill-blue-100" d="M405.8,64c-5.58-.91-11.17-1.79-16.74-2.77a3.22,3.22,0,0,1-1.83-1.2C383.39,55,379.62,49.81,376,44.44A152.85,152.85,0,0,1,405.8,64Z" />
      </svg>
      Loading...
    </div>
  );
};

export default Loading;
