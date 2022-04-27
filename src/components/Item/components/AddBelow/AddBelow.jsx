import React from 'react';

import {Action} from '../Action';

export function AddBelow(props) {
  return (
    <Action
      {...props}
      active={{
        fill: 'rgba(255, 70, 70, 0.95)',
        background: 'rgba(255, 70, 70, 0.1)',
      }}
    >
      <svg width="24px" viewBox="0 0 50 50" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <image width="50" height="50" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACH0lEQVRoge2ZzS5DQRTHf6hYYKkPoX0MxEoj6RvYCso71N6WHXvtI9CQEFY+4wEktq2NhtZizui47r3m3tuPEfNLJvd2Ps9/Zs7cMyl4PB6Px+PxeDz/nTOg62hqhBk8FiGkm0b9EPlhdy5pgxETOcHjw7RikHghruGFuIYX4hpeiGt4Ia7x14TsAS9JGuiQ2UUmwjJdW5FJoAwcAQ/AK9CS9yMpS2TzKFakBDzx+8XqSepaMUwh48CuMeYtsAUUgGlJBaAC3EmdDlDFYnWGKUSLeAPWifABYQLYANrSpvpb54O+d6/JOCXU7L4BCyF21IFaSP6iiOkAK3FCGgMU8QxMoRxb+8R6hB1xO2OTns9MxolJ2nFSyvR8Imo7xY2XA+6lvDzK43dVnvvAR4r278CBvFufYpp+rsij9DWfYbyilD8mHbyfQprS16z8rmPvZ/oAmJXfTZe+7EkmKPNkDmJrFTKM97W1RrkiV/JcytDHsjwv4yqdymB5Iy84Q3ngHDhJYYQ+fu9If/w+SHk5bqBLqXRDT4zZcV7KusCFne3fMD+IGxF14oRUsPwgmoZqMbrjsLI06BCljQo7gtSA45D8JSxDFE3Q4G7gPYsITVX6aqPCjrh/CHKolbAOGk1MMWa6JbsIUKF4FTW72me2USfSjKQisEMvJLEO44MExfRLhMkK9hcrq+0UxRzqFLum/yI0watuS9I9cChloY79CRmcF42xpu4LAAAAAElFTkSuQmCC" id="img_1" />
        </defs>
        <use xlinkHref="#img_1" fill="#FF4646" stroke="none" />
      </svg>
    </Action>
  );
}