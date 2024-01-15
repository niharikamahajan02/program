import React, { useState, useEffect } from 'react';
import {
  Container,
  Flex,
  Box,
  Input,
  Stack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Dash = () => {
  const [programs, setPrograms] = useState([]);
  const [displayedPrograms, setDisplayedPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProgram, setNewProgram] = useState({
   
  });

  useEffect(() => {
    axios.get('http://localhost:5000/programs')
      .then(response => {
        setPrograms(response.data);
        setDisplayedPrograms(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleEdit = (program) => {
    setSelectedProgram(program);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/programs/${selectedProgram.id}`, selectedProgram);
      updatePrograms();
    } catch (error) {
      console.error('Error updating program:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/programs/${id}`);
      updatePrograms();
      setSelectedProgram(null);
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredPrograms = programs.filter(program =>
      program.name.toLowerCase().includes(term.toLowerCase())
    );
    setDisplayedPrograms(filteredPrograms);
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/programs', newProgram);
      const addedProgram = response.data;
      setPrograms([...programs, addedProgram]);
      setDisplayedPrograms([...displayedPrograms, addedProgram]);
      setNewProgram({
        name: response.data.name,
      
      });
    } catch (error) {
      console.error('Error adding program:', error);
    }
  };

  const updatePrograms = async () => {
    try {
      const updatedPrograms = await axios.get('http://localhost:5000/programs');
      setPrograms(updatedPrograms.data);
      // Update displayedPrograms to reflect the changes
      setDisplayedPrograms(updatedPrograms.data);
      setSelectedProgram(null);
    } catch (error) {
      console.error('Error updating programs:', error);
    }
  };

  return (
    <Container maxW="container.lg" mt={10}>
      <Flex>
        {/* Left side - Search and Navigate */}
        <Box mr={4}>
          <Input
            placeholder="Search Programs"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Stack mt={4}>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {displayedPrograms.map(program => (
                  <Tr key={program.id}>
                    <Td>{program.id}</Td>
                    <Td>{program.name}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="teal"
                        onClick={() => handleEdit(program)}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => handleDelete(program.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Stack>
        </Box>

        {/* Right side - Add/Edit/View Program */}
        <Box flex="1">
        {selectedProgram ? (
  <>
    <form>
    
      <input
        type="text"
        value={selectedProgram.name}
        onChange={(e) => setSelectedProgram({ ...selectedProgram, name: e.target.value })}
      />
        <label>price:</label>
       <input
        type="text"
        value={selectedProgram.price}
        onChange={(e) => setSelectedProgram({ ...selectedProgram, name: e.target.price })}
      />

<label>domain:</label>
       <input
        type="text"
        value={selectedProgram.domain}
        onChange={(e) => setSelectedProgram({ ...selectedProgram, domain: e.target.value })}
      />
      
      

      {/* Add similar fields for other program details */}
    </form>
    <Flex justify="flex-end">
      <IconButton icon={<CheckIcon />} colorScheme="green" onClick={handleSave} />
      <IconButton icon={<CloseIcon />} colorScheme="red" ml={2} onClick={() => setSelectedProgram(null)} />
    </Flex>
  </>
) : (
  <>
    <Flex justify="flex-end">
      <IconButton icon={<AddIcon />} colorScheme="blue" onClick={handleAdd} />
    </Flex>
    <form>
      <label>Name:</label>
      <input
        type="text"
        value={newProgram.name}
        onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
      />
      <label>price:</label>
      <input
        type="text"
        value={newProgram.price}
        onChange={(e) => setNewProgram({ ...newProgram, price: e.target.value })}
      />
      <label>domain:</label>
      <input
        type="text"
        
        value={newProgram.domain}
        onChange={(e) => setNewProgram({ ...newProgram, domain: e.target.value })}
      />
      

      {/* Add similar fields for other program details */}
    </form>
  </>
)}

        </Box>
      </Flex>
    </Container>
  );
};

export default Dash;
