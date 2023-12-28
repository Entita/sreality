import React from 'react'
import {
  ConfigWrapperStyled,
  GridWrapperStyled,
  SettingsWrapperStyled,
  SubWrapperStyled,
  TitleGridWrapperStyled,
} from './Config.style'
import axios from 'axios'
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import Map from './Map'

const labels = {
  category_main_cb: {
    1: 'Byty',
    2: 'Domy',
    3: 'Pozemky'
  },
  category_type_cb: {
    1: 'Prodej',
    2: 'Pronájem',
    3: 'Dražba',
    4: 'Podíl'
  },
  building_condition: {
    1: 'Velmi dobrý',
    2: 'Dobrý',
    3: 'Špatný',
    4: 'Ve výstavbě',
    5: 'Developerské projekty',
    6: 'Novostavba',
    7: 'K demolici',
    8: 'Před rekonstrukcí',
    9: 'Po rekonstrukci',
    10: 'V rekonstrukci'
  },
  category_sub_cb: {
    2: '1+kk',
    3: '1+1',
    4: '2+kk',
    5: '2+1',
    6: '3+kk',
    7: '3+1',
    8: '4+kk',
    9: '4+1',
    10: '5+kk',
    11: '5+kk',
    12: '6+',
    16: 'Atypický'
  }
}

export const Config = ({ setResult, setPage }) => {
  const [loading, setLoading] = React.useState(false)
  const [loadingPages, setLoadingPages] = React.useState([0, 0])
  const [settings, setSettings] = React.useState({
    category_main_cb: 1,
    category_type_cb: 1,
    building_condition: [],
    category_sub_cb: [],
    locality_region_id: []
  })

  const getQueryFromSettings = () => {
    const query = new URLSearchParams()
    if (settings['category_main_cb'])
      query.set('category_main_cb', settings['category_main_cb'])
    if (settings['category_type_cb'])
      query.set('category_type_cb', settings['category_type_cb'])
    if (settings['building_condition'].length > 0)
      query.set('building_condition', settings['building_condition'].join('|'))
    if (settings['category_sub_cb'].length > 0)
      query.set('category_sub_cb', settings['category_sub_cb'].join('|'))
    if (settings['locality_region_id'].length > 0)
      query.set('locality_region_id', settings['locality_region_id'].join('|'))
    return query.toString()
  }

  const fetchData = (page = 1) => {
    return axios.get(`/api?${getQueryFromSettings()}&page=${page}&per_page=999`)
  }

  const fetchCount = async () => {
    setLoading(true)
    const query = await getQueryFromSettings()
    axios
      .get(`/api?/count?${query}`)
      .then(async ({ data }) => {
        const totalObjects = data.result_size
        const totalPages = Math.ceil(totalObjects / 999)
        const result = []
        for (let i = 0; i < totalPages; i++) {
          setLoadingPages([i + 1, totalPages])
          await fetchData(i + 1).then(({ data }) => result.push(...data._embedded.estates))
        }
        setResult({...data, estates: result})
        setPage(1)
      })
      .finally(() => setLoading(false))
  }

  const changeSettingsArray = (sub, value, remove = false) => {
    setSettings((prev) => ({
      ...prev,
      [sub]: remove
        ? prev[sub].filter((prevValue) => prevValue !== value)
        : [...prev[sub], value]
    }))
  }

  const changeSettings = (sub, value) => {
    setSettings((prev) => ({ ...prev, [sub]: value }))
  }

  return (
    <ConfigWrapperStyled>
      <SubWrapperStyled>
        <FormControl fullWidth>
          <InputLabel id={`category_main_cb_label`}>Kategorie</InputLabel>
          <Select
            label='Kategorie'
            labelId={`category_main_cb_label`}
            id='category_main_cb'
            value={settings['category_main_cb']}
            onChange={({ target }) =>
              changeSettings(
                'category_main_cb',
                Number(target.value),
              )
            }
          >
            {Object.keys(labels['category_main_cb']).map((key) => (
              <MenuItem value={key} key={key}>
                {labels['category_main_cb'][key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id={`category_type_cb_label`}>Druh</InputLabel>
          <Select
            label='Druh'
            labelId={`category_type_cb_label`}
            id='category_type_cb'
            value={settings['category_type_cb']}
            onChange={({ target }) =>
              changeSettings(
                'category_type_cb',
                Number(target.value),
              )
            }
          >
            {Object.keys(labels['category_type_cb']).map((key) => (
              <MenuItem value={key} key={key}>
                {labels['category_type_cb'][key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </SubWrapperStyled>
      <SettingsWrapperStyled>
        <TitleGridWrapperStyled>Typ</TitleGridWrapperStyled>
        <GridWrapperStyled>
          {Object.keys(labels['category_sub_cb']).map((key) => (
            <FormControlLabel
              key={key}
              value={key}
              control={<Checkbox />}
              label={labels['category_sub_cb'][key]}
              onChange={({ target }) =>
                changeSettingsArray(
                  'category_sub_cb',
                  Number(key),
                  !target.checked
                )
              }
            />
          ))}
        </GridWrapperStyled>
        <TitleGridWrapperStyled>Stav objektu</TitleGridWrapperStyled>
        <GridWrapperStyled>
          {Object.keys(labels['building_condition']).map((key) => (
            <FormControlLabel
              key={key}
              value={key}
              control={<Checkbox />}
              label={labels['building_condition'][key]}
              onChange={({ target }) =>
                changeSettingsArray(
                  'building_condition',
                  Number(key),
                  !target.checked
                )
              }
            />
          ))}
        </GridWrapperStyled>
        <TitleGridWrapperStyled>Výber lokality</TitleGridWrapperStyled>
        <Map settings={settings} changeSettingsArray={changeSettingsArray} />
      </SettingsWrapperStyled>
      <Button variant='outlined' onClick={() => fetchCount()} disabled={loading}>
        {loading && <CircularProgress />}
        {loadingPages[1] === 0 ? (
          <>Získat ceny</>
        ) : (
          <>{`Načteno ${loadingPages[0]} / ${loadingPages[1]} stránek`}</>
        )}
      </Button>
    </ConfigWrapperStyled>
  )
}
