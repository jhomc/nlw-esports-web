import { Input } from "./Form/Input";
import { CaretDown, Check, GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await axios.post(`http://localhost:3333/games/${selectedGame}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });

      alert("Anúncio criado com sucesso");
    } catch (err) {
      console.log(err);
      alert("Falha ao criar anúncio");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25 shadow-lg">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4"
            action="submit"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual é o game?
              </label>

              <Select.Root onValueChange={setSelectedGame}>
                <Select.Trigger
                  className="bg-zinc-900 py-3 px-4 rounded text-sm flex align-center justify-between radix-placeholder:text-zinc-500"
                  aria-label="game"
                >
                  <Select.Value placeholder="Selecione o game que deseja jogar" />
                  <Select.Icon className="flex align-center my-auto">
                    <CaretDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-zinc-900 p-1 text-white rounded">
                    <Select.Viewport>
                      <Select.Group>
                        {games.map((game) => {
                          return (
                            <Select.Item
                              className="hover:bg-violet-500 rounded px-2 mb-1"
                              key={game.id}
                              value={game.id}
                            >
                              <Select.ItemText>{game.title}</Select.ItemText>
                            </Select.Item>
                          );
                        })}
                      </Select.Group>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
              {/* <Input
                id="game"
               
              /> */}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">
                Seu nome (ou nickname)
              </label>

              <Input
                id="name"
                name="name"
                placeholder="Como te chamam dentro do game?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input
                  id="yearsPlaying"
                  name="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual o seu discord?</label>
                <Input
                  id="discord"
                  name="discord"
                  type="text"
                  placeholder="Usuário#0000"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Dias em que joga?</label>
                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Domingo"
                    className="w-8 h-8 bg-zinc-900 rounded radix-state-on:bg-violet-500"
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    title="Segunda"
                    className="w-8 h-8 bg-zinc-900 rounded radix-state-on:bg-violet-500"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    title="Terça"
                    className="w-8 h-8 bg-zinc-900 rounded radix-state-on:bg-violet-500"
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    title="Quarta"
                    className="w-8 h-8 bg-zinc-900 rounded radix-state-on:bg-violet-500"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    title="Quinta"
                    className="w-8 h-8 bg-zinc-900 rounded radix-state-on:bg-violet-500"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    title="Sexta"
                    className="w-8 h-8 bg-zinc-900 rounded radix-state-on:bg-violet-500"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    title="Sabado"
                    className="w-8 h-8 bg-zinc-900 rounded radix-state-on:bg-violet-500"
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>

              <div className="flex  flex-col gap-2 flex-1">
                <label htmlFor="hourStart">QualHorário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="hourStart"
                    name="hourStart"
                    type="time"
                    placeholder="De"
                  />
                  <Input
                    id="hourEnd"
                    name="hourEnd"
                    type="time"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex gap-2 items-center text-sm">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  checked === true
                    ? setUseVoiceChannel(true)
                    : setUseVoiceChannel(false);
                }}
                className="w-6 h-6 p-1 rounded bg-zinc-900"
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex gap-4 justify-end">
              <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 ">
                Cancelar
              </Dialog.Close>
              <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
