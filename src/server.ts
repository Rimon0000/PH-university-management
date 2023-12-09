import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import {Server} from 'http'

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

//for asynchronous
process.on('unhandledRejection', () =>{
  console.log(`unhandledRejection is detected, shuting down ... !`);

  if(server){
    server.close(() =>{
      process.exit(1)
    })
  }
  process.exit(1)
})

//for synchronous
process.on('uncaughtException', () =>{
  console.log(`uncaughtException is detected, shuting down ... !`);
  process.exit(1)
})
