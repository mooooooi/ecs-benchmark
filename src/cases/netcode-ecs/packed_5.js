import { World, Type, System, Matcher } from "@netcodejs/ecs";

const { i32 } = Type;

const A = World.define({ value: i32 });
const B = World.define({ value: i32 });
const C = World.define({ value: i32 });
const D = World.define({ value: i32 });
const E = World.define({ value: i32 });

class ASys extends System(Matcher.allOf(A)) {
  onUpdate(w, arch) {
    const a = arch.getChunk(A);
    for (let id = 0, len = arch.entities.length; id < len; id++) {
      a.value[id] *= 2;
    }
  }
}
class BSys extends System(Matcher.allOf(B)) {
  onUpdate(w, arch) {
    const b = arch.getChunk(B);
    for (let id = 0, len = arch.entities.length; id < len; id++) {
      b.value[id] *= 2;
    }
  }
}
class CSys extends System(Matcher.allOf(C)) {
  onUpdate(w, arch) {
    const c = arch.getChunk(C);
    for (let id = 0, len = arch.entities.length; id < len; id++) {
      c.value[id] *= 2;
    }
  }
}
class DSys extends System(Matcher.allOf(D)) {
  onUpdate(w, arch) {
    const d = arch.getChunk(D);
    for (let id = 0, len = arch.entities.length; id < len; id++) {
      d.value[id] *= 2;
    }
  }
}
class ESys extends System(Matcher.allOf(E)) {
  onUpdate(w, arch) {
    const e = arch.getChunk(E);
    for (let id = 0, len = arch.entities.length; id < len; id++) {
      e.value[id] *= 2;
    }
  }
}

export default (count) => {
  const world = new World();
  const asys = new ASys();
  const bsys = new BSys();
  const csys = new CSys();
  const dsys = new DSys();
  const esys = new ESys();
  world.addSystem(asys, bsys, csys, dsys, esys).finishAddSystem();

  const arch = world.createArchetype(A, B, C, D, E);
  for (let i = 0; i < count; i++) {
    world.createEntityByArchetype(arch);
    // const [a, id] = world.getComponent(e, A);
    // a.value[id] = 1;
  } 

  return () => {
    world.update();
  };
};
