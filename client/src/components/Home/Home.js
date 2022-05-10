import React, { useEffect, useState } from 'react'
import {    Container,   
            Grow,
            Grid,
            Paper,
            AppBar,
            TextField,
            Button
        } from '@material-ui/core';
import { useLocation, useNavigate } from "react-router-dom";  
// import ChipInput from "@jansedlon/material-ui-chip-input";    
// import {MDCChip}  from '@material/chips';  
// import Chip from "@material-ui/core/Chip";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Paginations from '../pagination';
import TagsInput from "./TagsInput"; 

import useStyles from "./styles";

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState(['length']);

    useEffect(() => {
      dispatch(getPosts());
    }, [currentId,dispatch]);

    const searchPost = () => {
      if(search.trim() || tags){
        dispatch(getPostsBySearch({search, tags: tags.join(',')}));
        history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }else{
        history("/");
      }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
          //search post
        }
    }

    function handleSelecetedTags(items) {
      setTags(items);
    }

    const handleAdd = (tag) => setTags([ ...tags, tag]);
    const handleDelete = (tagDelete) => setTags(tags.filter((tag) => tag !== tagDelete));

  return (

    <Grow in>
        <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignContent="stretch" spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6} md={9}>
                <Posts setCurrentId={setCurrentId}/>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                  <TextField  name="search" 
                              variant="outlined" 
                              label="Search Memories" 
                              onKeyPress={handleKeyPress}
                              fullWidth
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                  />
                  <TagsInput  style={{margin: '10px 0'}}
                              selectedTags={handleSelecetedTags}
                              value={tags}
                              fullWidth
                              label="Search Tags"
                              variant="outlined"
                  />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                </AppBar> 
                <Form currentId={currentId} setCurrentId={setCurrentId} />
                  {
                    (!searchQuery && !tags.length) &&(
                      <Paper elevation={6} className={classes.pagination}>
                        <Paginations page={page}/>
                      </Paper>
                    )
                  }

              </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home