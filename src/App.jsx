import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';


function App() {
  
  const [data, setData] = useState([]);
  const [datapais, setDataPais] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  const [nombre, setNombre] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [pais, setPais] = useState('');

  const [id, setId] = useState('')
  const [nombre2, setNombre2] = useState('');
  const [modelo2, setModelo2] = useState('');
  const [marca2, setMarca2] = useState('');
  const [pais2, setPais2] = useState('');
    
  
const Data = () =>{
  fetch(`${API}/moviles/`)
  .then(res => res.json())
  .then(data => setData(data));
}

const DataPais = () =>{
  fetch(`${API}/paises/`)
  .then(res => res.json())
  .then(data => setDataPais(data));
}

const handleDelete = (id) => {
  fetch(`${API}/moviles/${id}/`, {
    method: 'DELETE',
  })
    .then(res => {
      if (res.ok) {
        // Actualizar el estado para eliminar el elemento de la lista
        toast.success('Registro eliminado correctamente');
        setData(data.filter(item => item.Auto_id !== id));
      } else {
        console.error('Error al eliminar el elemento');
      }
    });
};

const handleCreate = () => {

  if (nombre === '') {
    toast.warn('Por favor digite un nombre');
  }else if(modelo === ''){
    toast.warn('Por favor digite el modelo');
  }else if(marca === ''){
    toast.warn('Por favor digite la marca');
  }else if(pais === ''){
    toast.warn('Por favor seleccione el pais');
  }else{
    
  }

  const data = {
    Auto_Name: nombre,
    Auto_Modelo: modelo,
    Auto_Marca: marca,
    Auto_Pais: pais,
  };
   

  fetch(`${API}/moviles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.ok) {
        Data()
        setNombre('');
        setModelo('');
        setMarca('');
        setPais('');

        toast.success("se creó correctamente!")
      } else {
        console.error('Error al Crear el Automovil');
      }
    });
};



useEffect(()=>{
  Data()
  DataPais()
}, [])

  const handleEdit = (row) => {    
    setId(row.Auto_id)
    setNombre2(row.Auto_Name)
    setModelo2(row.Auto_Modelo)
    setMarca2(row.Auto_Marca)
    setPais2(row.Auto_id)
  }


  const editarAutoMovile = () => {

    const data = {
      Auto_Name: nombre2,
      Auto_Modelo: modelo2,
      Auto_Marca: marca2,
      Auto_Pais: pais2,
    };

    fetch(`${API}/moviles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      Data()
      toast.success("se actualizó correctamente!")
    })
  }



  return (
    <>
    <div className='container mt-20'>

    <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '120px', marginTop: '30px'}}>
        <button className='btn btn-success' type='button' data-bs-toggle="modal" data-bs-target="#insertar">Add</button>
      </div>

      <h3 className='title'>Gestión de Automóviles</h3>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Modelo</th>
            <th scope="col">Marca</th>
            <th scope="col">País</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>

        <tbody className="table-group-divider t-center">
          {
            data.map((row, index) => (
              <tr key={row.Auto_id}>
                <th>{index + 1}</th>
                <td>{row.Auto_Name}</td>
                <td>{row.Auto_Modelo}</td>
                <td>{row.Auto_Marca}</td>
                <td>{row.Auto_Pais}</td>
                <td>
                  <button onClick={() => handleDelete(row.Auto_id)} className='btn btn-danger'><i className="bi bi-trash"></i></button> 
                  <button onClick={() => handleEdit(row)}  data-bs-toggle="modal" data-bs-target="#editar" className='btn btn-primary' type='button'>
                    <i className='bi bi-pen'></i>
                  </button>
                  </td>
              </tr>
            ))
          }
          
        </tbody>
      </table>
    </div>




        {/* Modal Actualizar*/}  
        <div className="modal fade" id="editar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Actualizar Registro Automovil</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="mb-3 row">
                  <label htmlFor="Nombre" className="col-sm-2 col-form-label">Nombre:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Nombre" value={nombre2} onChange={(e) => setNombre2(e.target.value)} />
                  </div>
                </div>
                
                <div className="mb-3 row">
                  <label htmlFor="Modelo" className="col-sm-2 col-form-label">Modelo:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Modelo" value={modelo2} onChange={(e) => setModelo2(e.target.value)} />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="Marca" className="col-sm-2 col-form-label" >Marca:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Marca" value={marca2} onChange={(e) => setMarca2(e.target.value)} />
                  </div>
                </div>
                
                <div className="mb-3 row">
                  <label htmlFor="Pais" className="col-sm-2 col-form-label">Pais:</label>
                  <div className='col-sm-10'>
                    <select className="form-control" aria-label="Large select example" value={pais2} onChange={(e) => setPais2(e.target.value)}>
                    {datapais.map((row) => (
                      <option key={row.sISOCode} value={row.sName}>{row.sName}</option>
                    ))}  
                    </select>
                  </div>

                </div>

              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => editarAutoMovile()} className="btn btn-success">Actualizar</button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Crear Registro*/}  
         <div className="modal fade"  id="insertar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Crear Automovil</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="mb-3 row">
                  <label htmlFor="Nombre" className="col-sm-2 col-form-label">Nombre:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" required id="Nombre" value={nombre} onChange={e => setNombre(e.target.value)}/>
                  </div>
                </div>
                
                <div className="mb-3 row">
                  <label htmlFor="Modelo" className="col-sm-2 col-form-label">Modelo:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" required id="Modelo" value={modelo} onChange={e => setModelo(e.target.value)}/>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="Marca" className="col-sm-2 col-form-label">Marca:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" required id="Marca" value={marca} onChange={e => setMarca(e.target.value)}/>
                  </div>
                </div>
                
                <div className="mb-3 row">
                  <label htmlFor="Pais" className="col-sm-2 col-form-label">Pais:</label>
                  <div className='col-sm-10'>
                  <select className="form-control" aria-label="Large select example" value={pais} onChange={e => setPais(e.target.value)}
>
                  <option value="">Selecciona un país</option>
                  {datapais.map((row) => (
                    <option key={row.sISOCode} value={row.sISOCode}>{row.sName}</option>
                  ))}
                </select>
                  </div>

                </div>

              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => handleCreate()} className="btn btn-success">Agregar</button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
    </>
  )
}

export default App
