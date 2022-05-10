import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBarSearch: {
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px'
    },
    pagination: {
        borderRadius: 4,
        marginTop: '1rem',
        padding: '16px'
    },
    gridContainer: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse'
        }
    },
    chip: {
        margin: theme.spacing(0.5, 0.25)
    },
    searchButton:{
        
    }
}));