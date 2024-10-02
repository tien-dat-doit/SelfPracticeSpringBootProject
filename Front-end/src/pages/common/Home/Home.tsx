import {
  Box,
  Button,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import LoadingComponentVersion2 from "../../../components/common/loading/Backdrop";
import ModalCreateNote from "../../../components/home/Note/CreateNewNote";
import ModalDeleteNote from "../../../components/home/Note/DeleteNote";
import SingleNoteComponent from "../../../components/home/Note/SingleNote";
import ModalUpdateNote from "../../../components/home/Note/UpdateNote";
import { FilterNoteType, NoteType } from "../../../types/Note/NoteType";
import NoteAPI from "../../../utils/NoteAPI";

const Home: React.FC = () => {
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  const [showModalUpdate, setShowModalUpdate] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [filter, setFilter] = React.useState<FilterNoteType>({
    pageNumber: 1,
    pageSize: 8,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(newPage);
    setFilter((prev: any) => ({ ...prev, pageNumber: newPage }));
  };

  const queryClient = useQueryClient();
  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes", filter],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000); // calcel request after 5s
      return NoteAPI.getAll(filter, controller.signal);
    },
  });

  return (
    <Box sx={{ p: 5, minHeight: "70vh" }}>
      {isLoading && <LoadingComponentVersion2 open={isLoading} />}
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant="h4"> Danh sách các ghi chú của tôi</Typography>
        <Button variant="outlined" onClick={() => setShowModalCreate(true)}>
          Tạo ghi chú
        </Button>
      </Stack>

      <Grid container spacing={5}>
        {notes?.result?.map((note) => (
          <SingleNoteComponent
            data={note}
            key={note.id}
            setSelectedNote={setSelectedNote}
            setShowModalUpdate={setShowModalUpdate}
            setShowModalDelete={setShowModalDelete}
          />
        ))}
      </Grid>
      {notes && notes?.pagination?.totalItem > 0 && (
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent={"center"}
          sx={{ mt: 5 }}
        >
          <Pagination
            color="primary"
            count={notes.pagination.totalPage || 0}
            page={filter.pageNumber}
            onChange={handleChangePage}
          />
        </Stack>
      )}
      <ModalCreateNote
        open={showModalCreate}
        setOpen={setShowModalCreate}
        queryClient={queryClient}
      />

      {selectedNote && (
        <ModalUpdateNote
          open={showModalUpdate}
          setOpen={setShowModalUpdate}
          queryClient={queryClient}
          data={selectedNote}
        />
      )}
      {selectedNote && (
        <ModalDeleteNote
          open={showModalDelete}
          setOpen={setShowModalDelete}
          queryClient={queryClient}
          data={selectedNote}
        />
      )}
    </Box>
  );
};

export default Home;
