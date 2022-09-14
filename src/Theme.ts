import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Alert: {
      baseStyle: {
        container: {
          borderRadius: 5,
        },
        title: {
          fontWeight: 'bold',
          fontSize: 14,
          lineHeight: 4,
          marginEnd: 2,
        },
        description: {
          lineHeight: 4,
          fontSize: 12,
        },
        icon: {
          flexShrink: 0,
          marginEnd: 3,
          w: 5,
          h: 6,
        },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 500,
        borderRadius: 8,
        letterSpacing: '-0.01em',
      },
      sizes: {
        sm: {
          fontWeight: '500',
          fontSize: '13px',
          px: '11px',
        },
        md: {
          h: '40px',
          fontSize: 'sm',
          px: '16px',
        },
        lg: {
          fontSize: 'sm',
          px: '16px',
        },
        xl: {
          fontSize: 'sm',
          px: '16px',
        },
      },
      variants: {
        stripe: {
          bg: '#fff',
          border: '1px solid #dbe6f3',
          boxShadow: 'rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.1) 0px 1px 3px -1px',
        },
        outline: {
          bg: '#fff',
          border: '1px solid #D0D5DD',
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
          borderRadius: 8,
        },
        primary: {
          bg: '#BB2030',
          color: '#fff',
          border: '1px solid #8e1723',
          boxShadow: '0px 1px 2px rgba(167, 38, 38, 0.2)',
          borderRadius: 8,
          fontWeight: 500,
          _hover: {
            bg: '#8e1723',
            color: '#fff',
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 5,
        px: 2,
        paddingTop: 0.5,
        paddingBottom: 0.5,
        fontWeight: 600,
        textTransform: 'none',
      },
      variants: {},
    },
    Textarea: {
      baseStyle: {
        fontSize: 12,
        bg: '#fff',
        border: '1px solid #dbe6f3',
        boxShadow: 'rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.1) 0px 1px 3px -1px',
        borderRadius: 8,
      },
      variants: {
        outline: {
          bg: '#fff',
          _focus: {
            zIndex: 1,
            borderColor: '#f5f5f5',
          },
        },
        stripe: {
          bg: '#fff',
          border: '1px solid #dbe6f3',
          boxShadow: 'rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.1) 0px 1px 3px -1px',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          bg: '#fff',
          border: '1px solid #dbe6f3',
          boxShadow: 'rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.1) 0px 1px 3px -1px',
          borderRadius: 8,
        },
        addon: {
          bg: '#52577f14',
        },
      },
      variants: {
        outline: {
          field: {
            bg: '#fff',
            _focus: {
              zIndex: 1,
              borderColor: '#f5f5f5',
            },
          },
        },
        sidebar: {
          field: {
            bg: '#52577f14',
            boxShadow: 'none',
            border: 'none',
            _focus: {
              borderColor: 'transparent',
              boxShadow: 'none',
            },
          },
          addon: {
            bg: '#52577f14',
          },
        },
        stripe: {
          field: {
            bg: '#fff',
            border: '1px solid #dbe6f3',
            boxShadow: 'rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.1) 0px 1px 3px -1px',
          },
          addon: {
            bg: '#52577f14',
          },
        },
      },
      sizes: {
        lg: {
          field: {
            fontSize: 'sm',
          },
          addon: {
            fontSize: 'sm',
          },
        },
        md: {
          field: {
            fontSize: 'sm',
          },
          addon: {
            fontSize: 'sm',
          },
        },
        sm: {
          field: {
            fontSize: 'sm',
            borderRadius: '5px',
          },
          addon: {
            fontSize: 'sm',
          },
        },
        xs: {
          field: {
            fontSize: 'sm',
          },
          addon: {
            fontSize: 'sm',
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          bg: '#fff',
          fontFamily: 'Aeonik, sans-serif',
          fontWeight: '500',
          border: '1px solid #dbe6f3',
          boxShadow: 'rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.1) 0px 1px 3px -1px',
          borderRadius: 8,
        },
        addon: {
          bg: '#52577f14',
        },
      },
      sizes: {
        sm: {
          field: {
            borderRadius: '5px',
          },
        },
      },
      variants: {
        outline: {
          field: {
            bg: '#fff',
            _focus: {
              zIndex: 1,
              borderColor: '#f5f5f5',
            },
          },
        },
      },
    },
    Avatar: {
      baseStyle: {
        container: {
          background: '#f5f5f5',
          color: '#000',
        },
      },
    },
    Menu: {
      baseStyle: {
        item: {
          fontSize: '13px',
          fontFamily: 'Aeonik, sans-serif',
        },
        button: {
          fontWeight: '600',
          borderRadius: '4px',
          fontFamily: 'Aeonik, sans-serif',
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          border: '1px solid #f1f1f1',
        },
      },
    },
    Tabs: {
      variants: {
        'soft-rounded': {
          tab: {
            borderRadius: '5px',
            fontWeight: 'semibold',
            fontFamily: 'Aeonik, sans-serif',
            color: '#aaadbc',
            _selected: {
              color: 'black',
              bg: 'white',
              boxShadow: '0 3px 8px 0 rgba(0,0,0,0.08), 0 3px 1px 0 rgba(0,0,0,0.04)',
            },
            _active: {
              color: 'black',
              bg: 'white',
              boxShadow: '0 3px 8px 0 rgba(0,0,0,0.08), 0 3px 1px 0 rgba(0,0,0,0.04)',
            },
            _focus: {
              color: 'black',
              bg: 'white',
              boxShadow: '0 3px 8px 0 rgba(0,0,0,0.08), 0 3px 1px 0 rgba(0,0,0,0.04)',
            },
          },
          tablist: {
            bg: '#f8f8fb',
            borderRadius: '10px',
            px: 1,
            py: 1,
            marginTop: 0,
          },
        },
        outline: {
          tab: {
            fontFamily: 'Inter, sans-serif',
            color: 'gray.800',
            fontWeight: 600,
            px: 3,
            py: '5px',
            fontSize: '13px',
            letterSpacing: '-0.02em',
            _selected: {
              color: 'black',
              bg: '#fcfcfd',
              fontWeight: 600,
            },
            _active: {
              color: 'gray.600',
              bg: 'white',
            },
            _focus: {
              color: 'gray.600',
              bg: 'white',
            },
            _notLast: {
              borderRight: '1px solid #D0D5DD',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
            _first: {
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            },
            _last: {
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            },
          },
          tablist: {
            borderRadius: 8,
            marginTop: 0,
            shadow: 'base',
            border: '1px solid #D0D5DD',
          },
        },
      },
    },
    Tooltip: {
      baseStyle: {
        px: '8px',
        py: '2px',
        bg: 'white',
        color: 'gray.600',
        border: '1px solid #eff1f4',
        borderRadius: 'md',
        fontWeight: 'medium',
        fontSize: 'sm',
        boxShadow: 'md',
        maxW: '320px',
        zIndex: 'tooltip',
      },
    },
  },
  colors: {
    red: {
      50: '#f8e9ea',
      100: '#ebbcc1',
      200: '#dd9098',
      300: '#cf636e',
      400: '#c23645',
      500: '#bb2030',
      600: '#a81d2b',
      700: '#831622',
      800: '#5e1018',
      900: '#380a0e',
    },
  },
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  config: {
    cssVarPrefix: 'mb',
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;
