package com.mecanica.org.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Averia.
 */
@Entity
@Table(name = "averia")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Averia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha_averia")
    private LocalDate fechaAveria;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "pagado")
    private Boolean pagado;

    @OneToMany(mappedBy = "averia")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BitacoraAveria> bitacoraAverias = new HashSet<>();

    @OneToMany(mappedBy = "averia")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Entrada> entradas = new HashSet<>();

    @OneToMany(mappedBy = "averia")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Pago> pagos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "averias", allowSetters = true)
    private Automovil automovil;

    @ManyToOne
    @JsonIgnoreProperties(value = "averias", allowSetters = true)
    private EstadoAveria estadoAveria;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaAveria() {
        return fechaAveria;
    }

    public Averia fechaAveria(LocalDate fechaAveria) {
        this.fechaAveria = fechaAveria;
        return this;
    }

    public void setFechaAveria(LocalDate fechaAveria) {
        this.fechaAveria = fechaAveria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Averia descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean isPagado() {
        return pagado;
    }

    public Averia pagado(Boolean pagado) {
        this.pagado = pagado;
        return this;
    }

    public void setPagado(Boolean pagado) {
        this.pagado = pagado;
    }

    public Set<BitacoraAveria> getBitacoraAverias() {
        return bitacoraAverias;
    }

    public Averia bitacoraAverias(Set<BitacoraAveria> bitacoraAverias) {
        this.bitacoraAverias = bitacoraAverias;
        return this;
    }

    public Averia addBitacoraAveria(BitacoraAveria bitacoraAveria) {
        this.bitacoraAverias.add(bitacoraAveria);
        bitacoraAveria.setAveria(this);
        return this;
    }

    public Averia removeBitacoraAveria(BitacoraAveria bitacoraAveria) {
        this.bitacoraAverias.remove(bitacoraAveria);
        bitacoraAveria.setAveria(null);
        return this;
    }

    public void setBitacoraAverias(Set<BitacoraAveria> bitacoraAverias) {
        this.bitacoraAverias = bitacoraAverias;
    }

    public Set<Entrada> getEntradas() {
        return entradas;
    }

    public Averia entradas(Set<Entrada> entradas) {
        this.entradas = entradas;
        return this;
    }

    public Averia addEntrada(Entrada entrada) {
        this.entradas.add(entrada);
        entrada.setAveria(this);
        return this;
    }

    public Averia removeEntrada(Entrada entrada) {
        this.entradas.remove(entrada);
        entrada.setAveria(null);
        return this;
    }

    public void setEntradas(Set<Entrada> entradas) {
        this.entradas = entradas;
    }

    public Set<Pago> getPagos() {
        return pagos;
    }

    public Averia pagos(Set<Pago> pagos) {
        this.pagos = pagos;
        return this;
    }

    public Averia addPago(Pago pago) {
        this.pagos.add(pago);
        pago.setAveria(this);
        return this;
    }

    public Averia removePago(Pago pago) {
        this.pagos.remove(pago);
        pago.setAveria(null);
        return this;
    }

    public void setPagos(Set<Pago> pagos) {
        this.pagos = pagos;
    }

    public Automovil getAutomovil() {
        return automovil;
    }

    public Averia automovil(Automovil automovil) {
        this.automovil = automovil;
        return this;
    }

    public void setAutomovil(Automovil automovil) {
        this.automovil = automovil;
    }

    public EstadoAveria getEstadoAveria() {
        return estadoAveria;
    }

    public Averia estadoAveria(EstadoAveria estadoAveria) {
        this.estadoAveria = estadoAveria;
        return this;
    }

    public void setEstadoAveria(EstadoAveria estadoAveria) {
        this.estadoAveria = estadoAveria;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Averia)) {
            return false;
        }
        return id != null && id.equals(((Averia) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Averia{" +
            "id=" + getId() +
            ", fechaAveria='" + getFechaAveria() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", pagado='" + isPagado() + "'" +
            "}";
    }
}
