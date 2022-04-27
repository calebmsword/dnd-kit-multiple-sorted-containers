import React from 'react';

import {Action} from '../Action';

export function AddAbove(props) {
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
          <image width="50" height="50" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACMklEQVRoge2ZS07DMBCGP/oQC+iSCq5AOQYgViCk3oBtVV53KHu2sKN74AwVQoKy4dWqB0BiC2xaQWHhiRLSJHVKG7sov2Q58djJ/B7PeJyAPorAHdCU66nEAnAPfEtpAUtGNRoBfhJTSaYIPKAUd+pvX5v1y8xriRawiEvEL7PaMrcMzrpDBH5b6yZx7WLgmsEI5SWCyJrSd6rgJ2INMqYVGBdSIrYhJWIb/j2RKwZzK2/YDZIlVRpBCs+EELFyr/BgQO9c3AGGETrB/95Hpg4pEduQErENKRHbkBKxDSkRQzgGXuMMsPZrCZANarTNInmgDNRRXzA/gHe5rossls4mLLIFdBh+sOpIXy0kSSQDHHne+QjsASVgTkoJ2AeepE8fqKFhnSSJOCS6QIUQHxBkgSrQkzG1YQ+f9Ll7R96zhZrdLrAaoMclcBHQviZk+sBmFJHGBEm8ALMox3Z8ohKiR9TK2MX1mXwUmUmjjOsTYcspikgOeBZ52WT43Zb6BPgaYfwncCrX2lFsEmijZnM5os+woLMi8vYY9YqNN1GiIPeX6PuZEwAKcv9m084eJ9xblT45S6sU0Ud7aZm0SFPq9T88Y0Nqoz9jnfD7xOjhtyXy8ti1iwHvhlgN6RNFZB9LNkRwU5QeKu3w4wI4D2hfRzNFSRI11Mz2UGlH1B+CHMoS2kljksigFOrj+swBKiLNS1kBDnFTEu003gQ20T9YWbOcwuA/6r5LeQbORBbo2D8yBQ/IbCwEXAAAAABJRU5ErkJggg==" id="img_2" />
        </defs>
        <use xlinkHref="#img_2" fill="#FF4646" stroke="none" />
      </svg>
    </Action>
  );
}