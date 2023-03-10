import styled from '@emotion/styled'
import { Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import GoogleMapReact from 'google-map-react'
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import { Root } from '../../styled-components'
import { animateProps, contactFadeIn, contactFadeOut, fadeIn, fadeOut, moveDownAnimation, moveLeftAnimation, moveRightAnimation, niceBoxShadow } from '../../utils/constants'
import { mapStyles } from './mapStyles'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { PropagateLoader } from 'react-spinners';
import { mainColor } from '../../App'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { MarkerTextContainer, MarkerText, ContactRoot, CardsContainer, ContactCard, ContactHeader, ContactFormText, ContactFormContainer, StyledTextField, StyledMuiFormControl, StyledDropdowns, SubmitContainer, FillerContainer, SpinnerContainer, SubmitButtonContainer, SubmitButton, BackgroundCard, BackgroundCardHeader, BackgroundImageContainer, BackgroundCardFooter, BackgroundCardFootText } from './contactStyles'
//============================================================================== 
const designationList = [
  'C.C.P.',
  'CNRA',
  'D.C.',
  'D.D.S.',
  'D.M.D.',
  'D.O.',
  'D.P.M.',
  'M.D.',
  'Medical Director',
  'MSN',
  'NP',
  'NPT',
  'O.D.',
  'P.A.',
  'Ph.D.',
  'RN',
  'Other',
];
const contactMethods = ['Phone', 'Email', 'Mail', 'Text', 'Other']
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const medPlusLatLong = { lat: 29.67561129384909, lng: -95.55940824563754 }
const mapCenter = { lat: 29.674176846912186, lng: -95.5500312429117 }
//============================================================================== 
const MyMarker = ({ text }: any) => (
  <MarkerTextContainer>
    <MarkerText>
      {text}
    </MarkerText>
    <LocationOnIcon fontSize='large' style={{color:'red'}}/>
  </MarkerTextContainer>
)
//==============================================================================
export const Contact = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [preferredMethodOfContact, setPreferredMethodOfContact] = useState<any>('')
  const [howCanWeHelpYou, setHowCanWeHelpYou] = useState<string>('')
  const [designation, setDesignation] = useState<any>()

  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<boolean>(false);

  useEffect(() => {

  }, [])

  const handleSubmit = () => {
    console.log({
      name,
      email,
      phoneNumber,
      preferredMethodOfContact,
      howCanWeHelpYou,
      designation,
    })

    // window.location.href=`mailto:info@medplusllc.com`
    setLoading(!loading);
    setResponse(true);
    
    // setLoading(true);
    setTimeout(() => {  
      setResponse(false);
    }, 3000);
    setTimeout(() => {
      setLoading(false);
    }, 6000);
      
}

  const handleMarkerClick = () => {
    console.log('clicked')
    window.open(
      'https://www.google.com/maps/place/MedPlus+LLC/@29.6754399,-95.5615433,17z/data=!3m2!4b1!5s0x8640c2aafdd00d8b:0x7f5d3c76c59201e6!4m5!3m4!1s0x8640c2aafe179287:0x6b6a33268ef3a113!8m2!3d29.6754353!4d-95.5593546'
    )
  }

  return (
    <ContactRoot>
      <CardsContainer>

      <ContactCard animate={loading}>
          <ContactHeader animate={loading === true}>
            <ContactFormText variant='button'>Contact Form</ContactFormText>
          </ContactHeader>
          <ContactFormContainer animate={loading === true}>
            <StyledTextField
              size='small'
              required
              label="Name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <StyledTextField
              size='small'
              required
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledTextField
              size='small'
              required
              label="Phone Number"
              variant="standard"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <StyledMuiFormControl fullWidth size='small'>
              <InputLabel>Preferred Method Of Contact</InputLabel>
              <StyledDropdowns
                label="Preferred Method of Contact"
                value={preferredMethodOfContact}
                onChange={(e) => setPreferredMethodOfContact(e.target.value)}
                variant="standard"
                size='small'
                >
                {contactMethods.map((method) => {
                  return <MenuItem value={method}>{method}</MenuItem>
                })
              }
              </StyledDropdowns>
            </StyledMuiFormControl>
            <StyledMuiFormControl fullWidth size='small'>
            <InputLabel>Designation</InputLabel>
              <StyledDropdowns
                label="Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                variant="standard"
                size='small'
              >
                {
                  designationList.map((designation) => {
                    return <MenuItem value={designation}>{designation}</MenuItem>
                  })
                }
              </StyledDropdowns>
            </StyledMuiFormControl>

            <StyledTextField
              size='small'
              required
              multiline
              label="Message"
              variant="standard"
              value={howCanWeHelpYou}
              // rows={4}
              onChange={(e) => setHowCanWeHelpYou(e.target.value)}
            />
          </ContactFormContainer>
          <SubmitContainer>
            <FillerContainer />

            <SpinnerContainer animate={response === true}>
              <PropagateLoader 
                loading={response}
                color={mainColor}
              />
              {loading === true && response === false && (
                // <Typography variant="h6">Sent!</Typography>
                <DoneOutlineIcon 
                  fontSize='large'
                  style={{
                    color: mainColor,
                    position: 'relative',
                    left: '10px',
                    top: '-10px',
                  }}
                />
              )}
            </SpinnerContainer>

            <SubmitButtonContainer>
              <SubmitButton 
                // disabled={loading} 
                variant="contained" 
                onClick={handleSubmit}
                animate={loading === true}
              >
                Send
              </SubmitButton>
            </SubmitButtonContainer>
          </SubmitContainer>
        </ContactCard>

        <BackgroundCard>
          <BackgroundCardHeader />
          <BackgroundImageContainer>
            <GoogleMapReact
              bootstrapURLKeys={{ key: String(apiKey) }}
              
              defaultCenter={ window.innerWidth > 600 ? mapCenter : medPlusLatLong }
              // zoom={14}
              defaultZoom={15}
              options={{
                disableDefaultUI: true,
                keyboardShortcuts: false,
                styles: mapStyles,
              }}
              onClick={handleMarkerClick}
            >
              <MyMarker
                lat={medPlusLatLong.lat}
                lng={medPlusLatLong.lng}
                text="MedPlus LLC"
              />
            </GoogleMapReact>
          </BackgroundImageContainer>
          <BackgroundCardFooter >
            <BackgroundCardFootText variant='body2'>
              866.995.1842 Toll Free
            </BackgroundCardFootText>
            <BackgroundCardFootText variant='body2'>
              713.995.1842 Local
            </BackgroundCardFootText>
            <BackgroundCardFootText variant='body2'>
              713.995.0692 Fax
            </BackgroundCardFootText>
            <BackgroundCardFootText variant='body2'>
              info@medplusllc.com
              </BackgroundCardFootText>
          </BackgroundCardFooter>

        </BackgroundCard>
      </CardsContainer>
      <Footer />
    </ContactRoot>
  )
}