import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';
import SelectInput from '../../Components/Inputs/SelectInput';
import TextInput from '../../Components/Inputs/TextInput';

const CompanyRegisterVacancy = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Vagas';
    });

    const consultPackage = {
        getValue: () => { return ''; },
        setValue: () => { },
    }

    return (
        <CompanyDefault>
            <div className="p-5">
                <h1 className='text-2xl'>
                    <i className="fa-solid fa-briefcase mr-2"></i>
                    <span>Cadastro de Vagas</span>
                </h1>

                <div className='w-full bg-lilac rounded-md mx-auto text-justify mt-2 pt-2 text-8x1 drop-shadow-lg px-5 md:mr-5'>
                    <h1 className='text-2xl'>Dados da Vaga</h1>
                    <div className='md:flex justify-between'>
                        <div className='w-6/12 mr-5'>
                            <input placeholder='Cargo' type='text' name='company-role' id='company-name' className='w-full mt-2 mb-5 md:mt-2 py-2 px-5 border-2 border-dark-purple rounded-md'/>           
                            <SelectInput placeholder='Setor' options={["Front", "Back"]} consultPackage={ consultPackage } name="Setor"></SelectInput>                      
                            <textarea className='w-full mt-2 mb-5 md:mt-2 py-2 px-5 border-2 border-dark-purple rounded-md' name="description" id="description" rows={ 5 } placeholder='Descrição'></textarea>
                        </div>
                        <div className='w-6/12'>
                            <SelectInput placeholder='Carga Horária' options={["1", "2", "3"]} consultPackage={ consultPackage } name="Setor"></SelectInput>  
                            <div className="md:flex justify-between">
                                <input placeholder='Salário' type='text' name='salary' id='salary' className='w-10/12 mt-2 mb-5 md:mt-2 py-2 px-5 mr-5 border-2 border-dark-purple rounded-md'/>  
                                <SelectInput placeholder='Moeda' options={["Moeda 1", "Moeda 2", "Moeda 3"]} consultPackage={ consultPackage } name="coin" id="coin"></SelectInput>  
                            </div>
                            
                            
                            <input placeholder='Região' type='text' name='region' id='region' className='w-full mt-2 mb-5 md:mt-2 py-2 px-5 border-2 border-dark-purple rounded-md'/>     
                            <div>
                                <input type='radio' value="Estágio" id="vagaEstagio"></input>
                                <label>Estágio</label><br></br>
                                <input type='radio' value="Permanente"></input>
                                <label>Permanente</label><br></br>
                                <input type='radio' value="Temporário"></input>
                                <label>Temporário</label><br></br>
                                
                            </div>
                        </div>
                    
                    </div>
                    
                </div>

                <div className='w-full bg-lilac rounded-md mx-auto text-justify mt-2 pt-2 text-8x1 drop-shadow-lg px-5 md:mr-5'>
                    <h1 className='text-2xl'>Requisitos</h1>
                    <div className='md:flex justify-between'>
                        <div className='w-6/12 mr-5'>
                            <input placeholder='Conhecimentos Prévios' type='text' name='knoledge' id='knowledge' className='w-full mt-2 mb-5 md:mt-2 py-2 px-5 border-2 border-dark-purple rounded-md'/>     
                            <input placeholder='A ser discutido' type='text' name='knoledge' id='knowledge' className='w-full mt-2 mb-5 md:mt-2 py-2 px-5 border-2 border-dark-purple rounded-md'/>         
                            {/* <SelectInput placeholder='Setor' options={["Front", "Back"]} consultPackage={ consultPackage } name="Setor"></SelectInput> */}
                        </div>
                        <div className='w-6/12'>
                            <SelectInput placeholder='Tempo de Experiência' options={["1", "2", "3"]} consultPackage={ consultPackage } name="experience" id="experience"></SelectInput>  
                        </div>
                    
                    </div>
                    
                </div>
                <div className='w-full bg-lilac rounded-md mx-auto text-justify mt-2 pt-2 text-8x1 drop-shadow-lg px-5 md:mr-5'>
                    <h1 className='text-2xl'>Dados Sistemáticos</h1>
                    <div className='md:flex justify-between'>
                        <div className='w-6/12 mr-5'>
                            <input placeholder='Cargo' type='date' name='company-role' id='company-name' className='w-full mt-2 mb-5 md:mt-2 py-2 px-5 border-2 border-dark-purple rounded-md'/>
                        </div>
                        <div className='w-6/12'>
                            <input placeholder='Salário' type='date' name='salary' id='salary' className='w-full mt-2 mb-5 md:mt-2 py-2 px-5 mr-5 border-2 border-dark-purple rounded-md'/>  
                        </div>
                    
                    </div>
                    
                </div>
                

            </div>
        </CompanyDefault>
    );
}

export default CompanyRegisterVacancy;
