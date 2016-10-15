let METEOR_URL = 'ws://localhost:3000/websocket';
if (process.env.NODE_ENV === 'production') {
  METEOR_URL = 'ws://chaz.tacopolice.com:80/websocket';
}

// METEOR_URL = 'ws://chaz.tacopolice.com:80/websocket'; 

export const settings = {
  env: process.env.NODE_ENV,
  METEOR_URL,
};

export default settings;
