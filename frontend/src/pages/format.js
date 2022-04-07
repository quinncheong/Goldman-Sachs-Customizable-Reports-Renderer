import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormatElementTile } from 'src/components/format/format-element-tile';
import { FormatDetails } from 'src/components/format/format-details';

const ReportFormat = () => (
    <>
        <Head>
            <title>
            Report Formatting
            </title>
        </Head>
        <Box
            component="main"
            sx={{
            alignItems: 'start',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%'
            }}
        >
            <Container maxWidth={false}>
                <NextLink
                    href="/"
                    passHref
                >
                    <Button
                    component="a"
                    startIcon={<ArrowBackIcon fontSize="small" />}
                    >
                    Dashboard
                    </Button>
                </NextLink>
                <Box
                    sx={{
                        alignItems: 'start',
                        display: 'flex',
                        flexGrow: 1,
                        minHeight: '100%',
                        backgroundColor: 'neutral.200',
                        borderRadius: 2,
                        p: 2
                        }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box 
                                sx={{ 
                                    px: 2,
                                    alignItems: "left",
                                    display: "flex",
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <Typography variant="h1">
                                    Filename
                                </Typography>
                                <Divider sx={{width: '100%'}} />
                            </Box> 
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormatElementTile />
                        </Grid>
                        <Grid item md={8} xs={12}>
                        <Box
                            sx={{
                                alignItems: 'start',
                                display: 'flex',
                                flexGrow: 1,
                                minHeight: '100%',
                                backgroundColor: 'neutral.300',
                                borderRadius: 2,
                            }}
                        >
                            
                        </Box>
                        </Grid> 
                    </Grid>
                </Box>
            </Container>
        </Box>
        </>
    );
    
    export default ReportFormat;



