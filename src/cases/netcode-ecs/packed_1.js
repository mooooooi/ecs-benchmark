import { World, Type, System, Matcher } from "@netcodejs/ecs";

const { i32 } = Type;

const A = World.define({ value: i32 });
const B = World.define({ value: i32 });
const C = World.define({ value: i32 });
const D = World.define({ value: i32 });
const E = World.define({ value: i32 });

class MySys extends System(Matcher.allOf(A)) {
  onUpdate(w, arch) {
    const a = arch.getChunk(A);
    for (let id = 0, len = arch.entities.length; id < len; id++) {
      a.value[id] *= 2;
    }
  }
}

export default (count) => {
  const world = new World();
  const sys = new MySys();

  const arch = world.createArchetype(A, B, C, D, E);
  for (let i = 0; i < count; i++) {
    world.createEntityByArchetype(arch);
  }

  return () => {
    world.updateSystem(sys);
  };
};
