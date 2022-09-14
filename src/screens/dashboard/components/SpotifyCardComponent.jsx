import {Box, Button, ButtonGroup, Center, Heading, IconButton, Progress, Stack, Text, useColorModeValue,} from '@chakra-ui/react';
import {ColorExtractor} from "react-color-extractor";
import {useState} from "react";
import {PauseIcon, PlayIcon} from "@heroicons/react/solid";

export default function SpotifyCardComponent({track, onColorChange, onLike, onDislike, progress, onPlay, isPlaying, isSelected}) {

  const [isPlayingButton, setIsPlayingButton] = useState(false);

  return (
    <Center py={6} className={'animated fadeInUp'}>
      <Box
        onMouseEnter={() => setIsPlayingButton(true)}
        onMouseLeave={() => setIsPlayingButton(false)}
        w={'300px'}
        minH={'300px'}
        className={'no-select'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={isSelected ? '2xl': 'none'}
        rounded={'md'}
        overflow={'hidden'}>
        {track.album.images && (
          <div>
            {isSelected ? (
              <ColorExtractor getColors={colors => onColorChange(colors)} maxColors={2}>
                <img width={"300px"} height={"300px"} src={track.album.images[0].url}  alt={"Image de l'album"}/>
              </ColorExtractor>
            ) : (
              <img width={"300px"} height={"300px"} src={track.album.images[0].url}  alt={"Image de l'album"}/>
            )}
            {isPlayingButton && (
              <div className={'play-button-overlay'} onClick={onPlay}>
                {isPlaying ? (
                  <IconButton
                    className={'play-button'}
                    variant={'unstyled'}
                    icon={<PauseIcon width={50} color={'white'}/>}
                  />
                ) : (
                  <IconButton
                    className={'play-button'}
                    variant={'unstyled'}
                    icon={<PlayIcon width={50} color={'white'}/>}
                  />
                )}
              </div>
            )}
          </div>
        )}

        <Progress colorScheme='green' size='sm' h={'3px'} w={'100%'} value={progress} />

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            {track.name && (
              <Heading fontSize={'md'} fontWeight={600} noOfLines={1}>
                {track.name}
              </Heading>
            )}
            {track.artists && track.artists.length > 0 && (
              <Text color={'gray.500'} noOfLines={1}>{track.artists[0].name}</Text>
            )}

          </Stack>

          <ButtonGroup w={'100%'} size={'sm'} variant={'outline'}>
            <Button w={'full'} onClick={onDislike} className={"card-refuse-onboarding"}>
              I don't like
            </Button>
            <Button
              w={'full'}
              colorScheme={'green'} onClick={onLike} className={"card-accept-onboarding"}>
              I like this one
            </Button>
          </ButtonGroup>

        </Box>
      </Box>
    </Center>
  );
}
