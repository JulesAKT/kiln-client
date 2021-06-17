import {
  BARTLETT_SIGN_IN_SUCCESS,
  FETCH_BARTLETT_STATUS_SUCCESS,
} from "../actions/types";

export type BartlettFiringMode = "Idle" | "Firing" | "Complete";

export interface BartlettKilnStatus {
  name: string;
  users: [string];
  status: {
    _id: string;
    alarm: string;
    firing: {
      step: string;
      set_pt: string;
      fire_min: string;
      fire_hour: string;
      hold_min: string;
      hold_hour: string;
      etr: string;
    };
    fw: string;
    num_fire: number;
    mode: BartlettFiringMode;
    t1: number;
    t2: number;
    t3: number;
  };
  config: {
    _id: string;
    err_codes: string;
    t_scale: string;
    num_zones: number;
  };
  program: {
    _id: string;
    name: string;
    steps: [any];
  };
  serial_number: string;
  mac_address: string;
  product: any;
  external_id: string;
  createdAt: string;
  updatedAt: string;
  firmware_version: any;
  firings_count: number;
  is_premium: boolean;
  is_premium_updated: string;
  latest_firing: {
    start_time: string;
    ended: boolean;
    update_time: string;
    just_ended: boolean;
    ended_time: string;
  };
  latest_firing_start_time: string;
}

export type BartlettSignInPayload = {
  controller_ids?: [string] | undefined;
  controller_names?: [string] | undefined;
  status: string | undefined;
  authentication_token: string;
};

export type BartlettType = {
  session: string | undefined;
  controller_ids?: [string] | undefined;
  controller_names?: [string] | undefined;
  auth_status: string | undefined;
  kilns: { [id: string]: BartlettKilnStatus };
};

// Bartlett Actions

interface BartlettSignInSuccessAction {
  type: typeof BARTLETT_SIGN_IN_SUCCESS;
  payload: BartlettSignInPayload;
}
interface BartlettFetchStatusSuccessAction {
  type: typeof FETCH_BARTLETT_STATUS_SUCCESS;
  payload: { kilns: [BartlettKilnStatus] };
}

export type BartlettActions =
  | BartlettSignInSuccessAction
  | BartlettFetchStatusSuccessAction;
