import { Box, Button, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { PaginationType } from "../../../types/CommonType";
import { FilterNoteType, NoteType } from "../../../types/Note/NoteType";
import NoteAPI from "../../../utils/NoteAPI";
import LoadingComponentVersion2 from "../../../components/common/loading/Backdrop";
import ModalCreateNote from "../../../components/home/Note/CreateNewNote";
import ModalUpdateNote from "../../../components/home/Note/UpdateNote";
import ModalDeleteNote from "../../../components/home/Note/DeleteNote";
import SingleNoteComponent from "../../../components/home/Note/SingleNote";

const Home: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  const [showModalUpdate, setShowModalUpdate] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [pagination, setPagination] = React.useState<PaginationType>({
    pageNumber: 1,
    pageSize: 10,
    totalItem: 10,
    totalPage: 1,
  });
  const [filter, setFilter] = React.useState<FilterNoteType>({
    pageNumber: 1,
    pageSize: 10,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(newPage);
    setFilter((prev: any) => ({ ...prev, pageNumber: newPage + 1 }));
  };

  const fetchListNotes = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await NoteAPI.getAll(filter);
      console.log({ data });
      setNotes(data.result);
      setPagination({
        pageNumber: data.pagination.pageNumber,
        pageSize: data.pagination.pageSize,
        totalItem: data.pagination.totalItem,
        totalPage: data.pagination.totalPage,
      });
    } catch (error) {
      console.log("Error get list Notes: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);
  React.useEffect(() => {
    fetchListNotes();
  }, [fetchListNotes]);

  return (
  <Box sx={{p:5, minHeight:"70vh"}}>
    {isLoading && <LoadingComponentVersion2 open={isLoading}/>}
    <Stack justifyContent={"space-between"} alignItems={"center"} spacing={2} sx={{mb: 3}}>
    <Typography variant="h4"> Danh sách các ghi chú của tôi
    </Typography>
    <Button variant="outlined" onClick={()=>setShowModalCreate(true)}>Tạo ghi chú</Button>
    </Stack>
    
     <Grid container spacing={5}>
      {notes.map((note)=>(
        <SingleNoteComponent 
        data={note} 
        key={note.id}
        setSelectedNote={setSelectedNote}
        setShowModalUpdate={setShowModalUpdate}
        setShowModalDelete={setShowModalDelete}
        />
      ))}
      </Grid>
   {pagination.totalItem > 0 && 
    <Stack
        spacing={2}
        direction={"row"}
        justifyContent={"center"}
        sx={{mt: 3}}
      >
        <Pagination
          color="primary"
          count={pagination.totalPage}
          page={pagination.pageNumber}
          onChange={handleChangePage}
        />
      </Stack>}
      <ModalCreateNote
        open={showModalCreate}
        setOpen={setShowModalCreate}
        fetchListNotes={fetchListNotes}
      />

      {selectedNote && <ModalUpdateNote
        open={showModalUpdate}
        setOpen={setShowModalUpdate}
        fetchListNotes={fetchListNotes}
        data={selectedNote}
      />}
      {selectedNote && <ModalDeleteNote
        open={showModalDelete}
        setOpen={setShowModalDelete}
        fetchAllNote={fetchListNotes}
        data={selectedNote}
      />}
  </Box>);
};

export default Home;
