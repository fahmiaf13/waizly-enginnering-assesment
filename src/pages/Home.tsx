import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { kebab, capital } from "case";
import { useDispatch } from "react-redux";
import { setName, setCity, setRegency } from "@/redux/todoSlice";

interface IProvinces {
  name: string;
  id: string;
}
interface IRegencies {
  name: string;
  id: string;
  description: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<IProvinces[]>([]);
  const [regencies, setRegencies] = useState<IRegencies[]>([]);

  const dispatch = useDispatch();

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    province: z.string({ required_error: "Please select a province" }).nonempty("required"),
    regency: z.string({ required_error: "Please select a regency" }).nonempty("required"),
  });
  const formMethods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      province: "",
      regency: "",
    },
  });

  const { handleSubmit, control, watch } = formMethods;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Success",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 1)}</code>
        </pre>
      ),
    });

    dispatch(setName(data.username));
    dispatch(setCity(data.province));
    dispatch(setRegency(data.regency));
    setTimeout(() => {
      navigate("/todo");
    }, 2000);
  }

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
        setProvinces(response.data);
      } catch (error) {
        throw new Error("error");
      }
    };
    fetchProvinces();
  }, []);

  const provinceId = watch("province");
  useEffect(() => {
    const fetchRegencies = async () => {
      if (provinceId !== "") {
        try {
          const response = await axios.get(`https://cuaca-gempa-rest-api.vercel.app/weather/${kebab(provinceId)}`);
          setRegencies(response.data.data.areas);
        } catch (error) {
          throw new Error("error");
        }
      }
    };

    fetchRegencies();
  }, [provinceId]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos === null) {
      setIsRegistered(false);
    } else {
      setIsRegistered(true);
    }
  }, []);

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto h-screen flex flex-col w-4/12 justify-center items-center">
        <Card className="p-5 w-full flex items-center flex-col">
          <div className="text-center">
            <div className="text-3xl font-extrabold">Todify</div>
          </div>
          <Form {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Input your name..." className="bg-slate-200" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3 my-3">
                <FormField
                  control={control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-200 w-full">
                            <SelectValue placeholder="Select a Province" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup className="h-[10rem]">
                            {provinces.map((province) => (
                              <SelectItem key={province.id} value={capital(province.name)}>
                                {capital(province.name)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="regency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regency/City</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-200 w-full">
                            <SelectValue placeholder="Select a Regency/City" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup className="h-[10rem]">
                            {regencies.map((regency) => (
                              <SelectItem key={regency.id} value={regency.id}>
                                {regency.description}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full mt-5" type="submit">
                Submit
              </Button>
              {!isRegistered && <div className="mt-3 text-center text-sm">You have to fill the form first!</div>}
            </form>
          </Form>
          {/* <Button onClick={() => navigate("/todo")} className="bg-primary hover:bg-primary font-extrabold">
            Let's Try
          </Button> */}
        </Card>
      </div>
    </div>
  );
}
