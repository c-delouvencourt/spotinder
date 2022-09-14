import {Box, Center, Heading, IconButton, Progress, Stack, Text,} from '@chakra-ui/react';
import {ColorExtractor} from "react-color-extractor";
import {useState} from "react";
import {PauseIcon, PlayIcon} from "@heroicons/react/solid";

export default function SpotifyCardComponent({track, onColorChange, onLike, onDislike, progress, onPlay, isPlaying, isSelected}) {

  const [isPlayingButton, setIsPlayingButton] = useState(false);
  const [color, setColor] = useState('#000000');

  return (
    <Center py={6} className={'animated fadeInUp'}>
      <Box
        w={'300px'}
        minH={'300px'}
        className={'no-select card-song'}
        boxShadow={isSelected ? '2xl': 'none'}
        rounded={'md'}
        overflow={'hidden'}>
        {track.album.images && (
          <div      onMouseEnter={() => setIsPlayingButton(true)}
                    onMouseLeave={() => setIsPlayingButton(false)}>
            {isSelected ? (
              <ColorExtractor getColors={colors => {
                setColor(colors[0]);
                onColorChange(colors)
              }} maxColors={2}>
                <img width={"300px"} height={"300px"} src={track.album.images[0].url}  alt={"Image de l'album"}/>
              </ColorExtractor>
            ) : (
              <img width={"300px"} height={"300px"} src={track.album.images[0].url}  alt={"Image de l'album"}/>
            )}
            {isPlayingButton && (
              <div className={'play-button-overlay animate__animated animate__fadeIn animate__faster'}>
                {isPlaying ? (
                  <IconButton
                    onClick={onPlay}
                    className={'play-button'}
                    variant={'unstyled'}
                    icon={<PauseIcon width={50} color={'white'}/>}
                  />
                ) : (
                  <IconButton
                    onClick={onPlay}
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
          <Stack spacing={0} align={'center'}>
            {track.name && (
              <Heading fontSize={'md'} textAlign={'center'} fontWeight={600} noOfLines={1} color={'#000'}>
                {track.name}
              </Heading>
            )}
            {track.artists && track.artists.length > 0 && (
              <Text noOfLines={1} fontSize={'12px'} color={'gray.700'}>{track.artists[0].name}</Text>
            )}
          </Stack>

        </Box>
      </Box>
    </Center>
  );
}
