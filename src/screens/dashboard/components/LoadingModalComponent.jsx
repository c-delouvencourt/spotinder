import {Button, Center, HStack, Modal, ModalBody, ModalContent, ModalOverlay, Spinner, Text, VStack,} from '@chakra-ui/react';
import {CheckIcon, RefreshIcon} from "@heroicons/react/outline";
import {useNavigate} from "react-router-dom";
import {Routes} from "../../../Routes";

export default function LoadingModalComponent({isOpen, isDone}) {

  let navigate = useNavigate();

  return (
    <Modal isCentered={true} isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Center py={5}>
            <HStack spacing={3}>
              {isDone ? (
                <>
                  <VStack>
                    <HStack>
                      <CheckIcon width={25} color={'#45b541'}/>
                      <Text>Added to a new playlist</Text>
                    </HStack>

                    <Button size={'sm'} variant={'outline'} style={{marginTop: 30}} leftIcon={<RefreshIcon width={20}/>} onClick={() => {
                      localStorage.clear();
                      sessionStorage.clear();
                      navigate(Routes.AUTH.LOGIN);
                    }}>Restart a Spotinder session</Button>
                  </VStack>
                </>
              ) : (
                <>
                  <Spinner colorScheme={'green'}/>
                  <Text>Add to a new playlist in progress...</Text>
                </>
              )}
            </HStack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
