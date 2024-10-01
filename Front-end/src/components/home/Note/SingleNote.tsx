import { Button, CardActions, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import moment from "moment";
import { NoteType } from "../../../types/Note/NoteType";
export type SingleNote = {
  data: NoteType;
  setSelectedNote: React.Dispatch<React.SetStateAction<NoteType | null>>
  setShowModalUpdate: React.Dispatch<React.SetStateAction<boolean>>
  setShowModalDelete: React.Dispatch<React.SetStateAction<boolean>>
};

export default function SingleNoteComponent({ data, setSelectedNote, setShowModalUpdate, setShowModalDelete }: SingleNote) {

  return (
    <Grid item xs={12} sm={4} md={3} lg={3}>
      <Card
        sx={{ maxWidth: 300 }}    
      >
        <CardMedia
        sx={{ height: 180 }}
        image={data.imageURL}
        title="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
         <span style={{fontWeight:600}}>Nội dung: </span> {data.content}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1  }}>
        <span style={{fontWeight:600}}>Ngày tạo: </span>{moment(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        <span style={{fontWeight:600}}>Cập nhật lúc: </span>{data.updatedAt ? moment(data.updatedAt).format("DD/MM/YYYY HH:mm:ss") : "Chưa cập nhật"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{
          setSelectedNote(data)
          setShowModalUpdate(true)
          }}>Cập nhật</Button>
        <Button size="small" onClick={()=>{
          setSelectedNote(data)
          setShowModalDelete(true)
          }}>Xóa</Button>
      </CardActions>     
      </Card>
    </Grid>
  );
}
