import React from 'react';
import { Slide, toast } from 'react-toastify';
import { HStack, Stack } from '@chakra-ui/react';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationIcon, InformationCircleIcon } from '@heroicons/react/outline';

const position = toast.POSITION.TOP_RIGHT;

interface MessageProps {
  msg: string;
  toastProps?: any;
}

const ErrorMsg = ({ msg, toastProps } : MessageProps) => (
  <HStack align={'flex-start'} spacing={3}>
    <ExclamationCircleIcon width={25} color={'#ae3a3a'} />
    <Stack>
      <p className="has-text-weight-bold">Erreur</p>
      <p style={{ marginTop: 0 }}>{msg}</p>
    </Stack>
  </HStack>
);

const WarningMsg = ({ msg, toastProps } : MessageProps) => (
  <HStack align={'flex-start'} spacing={3}>
    <ExclamationIcon width={25} color={'#d7ae15'} />
    <Stack>
      <p className="has-text-weight-bold">Attention</p>
      <p style={{ marginTop: 0 }}>{msg}</p>
    </Stack>
  </HStack>
);

const InfoMsg = ({ msg, toastProps } : MessageProps) => (
  <HStack align={'flex-start'} spacing={3}>
    <InformationCircleIcon width={25} color={'#1559d7'} />
    <Stack>
      <p className="has-text-weight-bold">Information</p>
      <p style={{ marginTop: 0 }}>{msg}</p>
    </Stack>
  </HStack>
);

const SuccessMsg = ({ msg, toastProps } : MessageProps) => (
  <HStack align={'flex-start'} spacing={3}>
    <CheckCircleIcon width={25} color={'#5cc895'} />
    <Stack>
      <p className="has-text-weight-bold">Succès</p>
      <p style={{ marginTop: 0 }}>{msg}</p>
    </Stack>
  </HStack>
);

export default class ToastUtils {
  static showTest(message: string) {
    toast.success(<InfoMsg msg={message} />, {
      position: position,
      autoClose: 1000 * 60 * 10,
      hideProgressBar: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      transition: Slide,
      icon: false,
    });
  }

  static showSuccess(message: string) {
    toast.success(<SuccessMsg msg={message} />, {
      position: position,
      autoClose: 5000,
      hideProgressBar: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      transition: Slide,
      icon: false,
    });
  }

  static showError(message: string) {
    toast.error(<ErrorMsg msg={message} />, {
      position: position,
      autoClose: 5000,
      hideProgressBar: true,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      transition: Slide,
      icon: false,
    });
  }

  static showDanger(message: string) {
    toast.warn(<WarningMsg msg={message} />, {
      position: position,
      autoClose: 5000,
      hideProgressBar: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      transition: Slide,
      icon: false,
    });
  }

  static showInfo(message: string) {
    toast.info(<InfoMsg msg={message} />, {
      position: position,
      autoClose: 5000,
      hideProgressBar: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      transition: Slide,
      icon: false,
    });
  }
}
