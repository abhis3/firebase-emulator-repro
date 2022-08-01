import './App.css';
import {
  connectStorageEmulator,
  FirebaseStorage,
  getStorage,
  ref,
  uploadString,
  listAll,
  uploadBytes
} from "firebase/storage";
import { initializeApp } from 'firebase/app';

function getEmulatedStorage() {
  const app = initializeApp({
    projectId: `sample`,
  });
  const storage = getStorage(app, "gs://foo.appspot.com");
  connectStorageEmulator(storage, "localhost", 9199);

  return storage;
}
function getProdStorage() {
      // Initialize Firebase
      const firebaseConfig = {
        //YOUR FIREBASE CONFIG HERE
      };
      const app = initializeApp(firebaseConfig)
      const storage = getStorage(app);
      return storage;
}

function App() {

  const fix3823 = () => {
    const storage = getEmulatedStorage()
    //const listRef = ref(storage, 'users/1111');
    //const r = ref(storage, "/users/1111/media/2222");
    //uploadString(r, "fooooo").then(response=>console.log(response)).catch(e =>console.log(e));
  }

  const upload4778 = () => {
    const storage = getEmulatedStorage()
    const r = ref(storage, "/users/1111/media/2222");
    const s = ref(storage, "/users/1111/media/3333");
    uploadString(r, "fooooo").then(response=>console.log(response)).catch(e =>console.log(e));
    uploadString(s, "barrrrr");
  }
  const list3533 = async () => {
    const storage = getEmulatedStorage()
    try {
      const uid = 2000;
      const storageRef = ref(storage,`${uid}`);
      const res = await listAll(storageRef);
      let uploadedPhotos = [];
      const fetchImage = async (ref) => {
        const path = ref.location.path_;
        const url = await ref.getDownloadURL();
        uploadedPhotos.push({
          url,
          path,
        });
      };
      for (let i = 0; i < res.items.length; i++) {
        await fetchImage(res.items[i]);
      }
      return uploadedPhotos;
    } catch (e) {
      console.error(e);
    }
  }
  const upload3772 = async () => {
    const storage = getEmulatedStorage()
    const storageRef = ref(storage, 'test/cover.webp');

    const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
    uploadBytes(storageRef, bytes, {contentType: "image/webp"}).then((snapshot) => {
        console.log('Uploaded an array!');
    });
}
  return (
    <div className="App">
      <header className="App-header">
        <h1>Github Issues Repro</h1>
        <button onClick={upload4778}>
          4778
        </button>
        <button onClick={list3533}>
          3533
        </button>
        <button onClick={upload3772}>
          3772
        </button>
        {<button onClick={fix3823}>
          3823
        </button>
        }
      </header>
    </div>
  );
}

export default App;
